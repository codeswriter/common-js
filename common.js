/*
 * @created    08/07/2015 11:51 PM
 * @author    Oscar H. Reyes <reyes.oscarh@gmail.com>
 */

var common = {
    form: {
        clear: function (form) {
            form.find(':input').each(function () {
                switch (this.type) {
                    case 'password':
                    case 'select-multiple':
                    case 'select-one':
                    case 'text':
                    case 'number':
                    case 'textarea':
                        $(this).val('');
                        break;
                    case 'checkbox':
                    case 'radio':
                        this.checked = false;
                }
            });
        },
        populate: function (form, data) {
            common.form.clear(form);
            $.each(data, function (key, value) {
                var ctrl = form.find('[name=' + key + ']');
                if (ctrl.is('select')) {
                    $('option', ctrl).each(function () {
                        if (this.value == value)
                            this.selected = true;
                    });
                } else if (ctrl.is('textarea')) {
                    ctrl.val(value);
                } else {
                    switch (ctrl.attr("type")) {
                        case "text":
                        case "hidden":
                            ctrl.val(value);
                            break;
                        case "checkbox":
                            if (value === '1')
                                ctrl.prop('checked', true);
                            else
                                ctrl.prop('checked', false);
                            break;
                    }
                }
            });
        },
        toArray: function (form, ignore) {
            /* Retorna un array con los campos de un formulario */
            var o = {};
            var a = form.serializeArray();
            $.each(a, function () {
                if (this.name != ignore) {
                    if (o[this.name]) {
                        if (!o[this.name].push) {
                            o[this.name] = [o[this.name]];
                        }
                        o[this.name].push(this.value || '');
                    } else {
                        o[this.name] = this.value || '';
                    }
                }
            });

            return o;
        }
    },
    /*
     * elimina un objecto en el arreglo de objectos por alguna propiedad,
     * @property String Propiedad por la cual se buscara el objeto
     * @value Mix Valor a comparar para encontrar el objeto a remover
     * @haystack ArrayObject [] array de objetos donde se buscara el objeto a eliminar
     *
     */
    lts: {
        makeId: function () {
            var id = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

            for (var i = 0; i < 5; i++)
                id += possible.charAt(Math.floor(Math.random() * possible.length));

            return id;
        },
        get: function (haystack, property, value) {
            var object = null;
            $.each(haystack, function (index, obj) {
                var needle = obj[String(property)];

                if (value == needle) {
                    object = obj;
                }
            });

            return object;
        },
        update: function (haystack, property, value, data) {
            $.each(haystack, function (index, obj) {
                var needle = obj[String(property)];

                if (value == needle) {
                    haystack[index] = data;
                }
            });

            return haystack;
        },
        remove: function (haystack, property, value) {
            var removeIndex;
            $.each(haystack, function (index, obj) {
                var needle = obj[String(property)];

                if (value == needle) {
                    removeIndex = index;
                }
            });

            haystack.splice(removeIndex, 1);

            return haystack;
        },
        first: function (haystack) {
            return haystack[0];
        },
        clear: function (haystack) {
            haystack.length = 0;

            return haystack;
        }

    },
    number: {
        decimals: function (number) {
            var no = number.toString();
            var n = no.split(".");
            var decimal = n[1];

            if (typeof (decimal) === "undefined") {
                decimal = "00";
            }

            return "0." + decimal;
        },
        integer: function (number) {
            return parseInt(number);
        }
    }
};