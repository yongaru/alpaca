(function($) {

    var Alpaca = $.alpaca;

    Alpaca.Fields.IntegerField = Alpaca.Fields.NumberField.extend(
    /**
     * @lends Alpaca.Fields.IntegerField.prototype
     */
    {
        /**
         * @see Alpaca.Fields.NumberField#getFieldType
         */
        getFieldType: function() {
            return "integer";
        },

        /**
         * @see Alpaca.Fields.NumberField#getValue
         */
        getValue: function()
        {
            var textValue = this.getControlEl().val();

            if (Alpaca.isValEmpty(textValue))
            {
                return -1;
            }
            else
            {
                return parseInt(textValue, 10);
            }
        },

        /**
         * @see Alpaca.Field#onChange
         */
        onChange: function(e)
        {
            this.base();

            if (this.slider)
            {
                this.slider.slider("value", this.getValue());
            }
        },

        /**
         * @see Alpaca.Fields.NumberField#postRender
         */
        postRender: function(callback)
        {
            var self = this;

            this.base(function() {

                if (self.options.slider)
                {
                    if (!Alpaca.isEmpty(self.schema.maximum) && !Alpaca.isEmpty(self.schema.minimum))
                    {
                        if (self.control)
                        {
                            self.control.after('<div id="slider"></div>');

                            self.slider = $('#slider', self.control.parent()).slider({
                                value: self.getValue(),
                                min: self.schema.minimum,
                                max: self.schema.maximum,
                                slide: function(event, ui) {
                                    self.setValue(ui.value);
                                    self.refreshValidationState();
                                }
                            });
                        }
                    }
                }

                callback();
            });
        },

        /**
         * @see Alpaca.Fields.NumberField#handleValidate
         */
        handleValidate: function()
        {
            var baseStatus = this.base();

            var valInfo = this.validation;

            if (!valInfo["stringNotANumber"]["status"]) {
                valInfo["stringNotANumber"]["message"] = this.view.getMessage("stringNotAnInteger");
            }

            return baseStatus;
        },

        /**
         * Validates if it is an integer.
         * @returns {Boolean} true if it is an integer
         */
        _validateNumber: function()
        {
            var textValue = this.getControlEl().val();

            if (Alpaca.isValEmpty(textValue)) {
                return true;
            }

            var floatValue = this.getValue();

            // quick check to see if what they entered was a number
            if (isNaN(floatValue)) {
                return false;
            }

            // check if valid number format
            if (!textValue.match(Alpaca.regexps.integer)) {
                return false;
            }

            return true;
        },//__BUILDER_HELPERS

        /**
         * @private
         * @see Alpaca.Fields.NumberField#getSchemaOfSchema
         */
        getSchemaOfSchema: function() {
            return Alpaca.merge(this.base(), {
                "properties": {
                    "minimum": {
                        "title": "Minimum",
                        "description": "Minimum value of the property.",
                        "type": "integer"
                    },
                    "maximum": {
                        "title": "Maximum",
                        "description": "Maximum value of the property.",
                        "type": "integer"
                    },
                    "divisibleBy": {
                        "title": "Divisible By",
                        "description": "Property value must be divisible by this number.",
                        "type": "integer"
                    }
                }
            });
        },

        /**
         * @private
         * @see Alpaca.Fields.NumberField#getOptionsForSchema
         */
        getOptionsForSchema: function() {
            return Alpaca.merge(this.base(), {
                "fields": {
                    "minimum": {
                        "helper": "Minimum value of the field.",
                        "type": "integer"
                    },
                    "maximum": {
                        "helper": "Maximum value of the field.",
                        "type": "integer"
                    },
                    "divisibleBy": {
                        "helper": "Property value must be divisible by this number.",
                        "type": "integer"
                    }
                }
            });
        },

        /**
         * @private
         * @see Alpaca.Fields.NumberField#getSchemaOfOptions
         */
        getSchemaOfOptions: function() {
            return Alpaca.merge(this.base(), {
                "properties": {
                    "slider": {
                        "title": "Slider",
                        "description": "Generate jQuery UI slider control with the field if true.",
                        "type": "boolean",
                        "default": false
                    }
                }
            });
        },

        /**
         * @private
         * @see Alpaca.Fields.NumberField#getOptionsForOptions
         */
        getOptionsForOptions: function() {
            return Alpaca.merge(this.base(), {
                "fields": {
                    "slider": {
                        "rightLabel": "Slider control ?",
                        "helper": "Generate slider control if selected.",
                        "type": "checkbox"
                    }
                }
            });
        },

        /**
         * @see Alpaca.Fields.NumberField#getTitle
         */
        getTitle: function() {
            return "Integer Field";
        },

        /**
         * @see Alpaca.Fields.NumberField#getDescription
         */
        getDescription: function() {
            return "Field for integers.";
        },

        /**
         * @see Alpaca.Fields.NumberField#getType
         */
        getType: function() {
            return "integer";
        }
        //__END_OF_BUILDER_HELPERS
    });

    // Additional Registrations
    Alpaca.registerMessages({
        "stringNotAnInteger": "This value is not an integer."
    });
    Alpaca.registerFieldClass("integer", Alpaca.Fields.IntegerField);
    Alpaca.registerDefaultSchemaFieldMapping("integer", "integer");

})(jQuery);
