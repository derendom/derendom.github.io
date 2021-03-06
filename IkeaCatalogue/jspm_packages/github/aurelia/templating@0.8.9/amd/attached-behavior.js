/* */ 
"format register";
define(["exports","aurelia-metadata","./behavior-instance","./behaviors","./util"], function (exports, _aureliaMetadata, _behaviorInstance, _behaviors, _util) {
  "use strict";

  var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

  var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

  var ResourceType = _aureliaMetadata.ResourceType;
  var BehaviorInstance = _behaviorInstance.BehaviorInstance;
  var configureBehavior = _behaviors.configureBehavior;
  var hyphenate = _util.hyphenate;
  var AttachedBehavior = exports.AttachedBehavior = (function (ResourceType) {
    function AttachedBehavior(attribute) {
      this.name = attribute;
      this.properties = [];
      this.attributes = {};
    }

    _inherits(AttachedBehavior, ResourceType);

    _prototypeProperties(AttachedBehavior, {
      convention: {
        value: function convention(name) {
          if (name.endsWith("AttachedBehavior")) {
            return new AttachedBehavior(hyphenate(name.substring(0, name.length - 16)));
          }
        },
        writable: true,
        configurable: true
      }
    }, {
      analyze: {
        value: function analyze(container, target) {
          configureBehavior(container, this, target);
        },
        writable: true,
        configurable: true
      },
      load: {
        value: function load(container, target) {
          return Promise.resolve(this);
        },
        writable: true,
        configurable: true
      },
      register: {
        value: function register(registry, name) {
          registry.registerAttribute(name || this.name, this, this.name);
        },
        writable: true,
        configurable: true
      },
      compile: {
        value: function compile(compiler, resources, node, instruction) {
          instruction.suppressBind = true;
          return node;
        },
        writable: true,
        configurable: true
      },
      create: {
        value: function create(container, instruction, element, bindings) {
          var executionContext = instruction.executionContext || container.get(this.target),
              behaviorInstance = new BehaviorInstance(this, executionContext, instruction);

          if (!(this.apiName in element)) {
            element[this.apiName] = behaviorInstance.executionContext;
          }

          if (this.childExpression) {
            bindings.push(this.childExpression.createBinding(element, behaviorInstance.executionContext));
          }

          return behaviorInstance;
        },
        writable: true,
        configurable: true
      }
    });

    return AttachedBehavior;
  })(ResourceType);
  exports.__esModule = true;
});