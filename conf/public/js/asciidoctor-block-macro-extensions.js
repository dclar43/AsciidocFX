function process_uml_block_macro(obj) {

    var attrs = obj["attrs"];
    var parent = obj["parent"];
    var __self = obj["__self"];
    var nil = obj["nil"];
    var name = obj["name"];
    var target = obj["target"];

    var title = (attrs['$[]']("title")),
        alt = (attrs['$[]']("alt")),
        caption = (attrs['$[]']("caption")),
        width = (attrs['$[]']("width")),
        height = (attrs['$[]']("height")),
        scale = (attrs['$[]']("scale")),
        align = (attrs['$[]']("align")),
        type = (attrs['$[]']("type")),
        cache = (attrs['$[]']("cache")),
        role = (attrs['$[]']("role")),
        link = (attrs['$[]']("link")),
        float = (attrs['$[]']("float")),
        imagesdir = parent.$document().$attr('imagesdir', '');

    var filename = "";

    if (!attrs['$[]']("file")["$nil?"]()) {
        filename = "" + attrs['$[]']("file");
    }
    else {
        var split = ("" + target).split("/");
        filename = split[split.length - 1] + ".png";
    }

    var content = Ajax.getFile(target);

    if (cache != "enabled") {
        //afx[name](reader.$read(), type, imagesdir, target);

        var parameters = [content, type, imagesdir, parent.$image_uri(filename), name].map(function (e) {
            return e + "";
        });
        var command = name;

        //afx[command].apply(afx,parameters);

        postMessage(JSON.stringify({
            type: "afx",
            func: command,
            parameters: parameters
        }));

    }

    var attributes = {
        "target": filename,
        "title": title,
        "alt": alt,
        "caption": caption,
        "width": width,
        "height": height,
        "scale": scale,
        "align": align,
        "role": role,
        "link": link,
        "float": float
    };

    var keys = Object.keys(attributes);

    keys.forEach(function (key) {
        if (attributes[key]["$nil?"]()) {
            delete attributes[key];
        }
    });

    return __self.$create_image_block(parent, Opal.hash(attributes));

};

function registerUmlBlockMacro(name) {

    /* Generated by Opal 0.9.2 */
    Opal.modules[name + "-block-macro/extension"] = function (Opal) {
        Opal.dynamic_require_severity = "ignore";
        var OPAL_CONFIG = {method_missing: true, arity_check: false, freezing: true, tainting: true};
        var __self = Opal.top, $scope = Opal, nil = Opal.nil, $breaker = Opal.breaker, $slice = Opal.slice, $klass = Opal.klass;

        Opal.add_stubs(['$==', '$include', '$use_dsl', '$named']);
        if ($scope.get('RUBY_ENGINE')['$==']("opal")) {
        }
        ;
        __self.$include(Opal.get('Asciidoctor'));
        return (function ($base, $super) {
            function $ExtensionBlockMacro() {
            };
            var __self = $ExtensionBlockMacro = $klass($base, $super, name + 'BlockMacro', $ExtensionBlockMacro);

            var def = __self.$$proto, $scope = __self.$$scope;

            __self.$use_dsl();

            __self.$named(name);

            return (Opal.defn(__self, '$process', function (parent, target, attrs) {
                    var __self = this;

                    return process_uml_block_macro({
                        parent: parent,
                        attrs: attrs,
                        __self: __self,
                        nil: nil,
                        name: name,
                        target: target
                    });

                }), nil) && 'process';
        })($scope.base, (($scope.get('Extensions')).$$scope.get('BlockMacroProcessor')));
    };

    /* Generated by Opal 0.9.2 */
    (function (Opal) {
        Opal.dynamic_require_severity = "ignore";
        var OPAL_CONFIG = {method_missing: true, arity_check: false, freezing: true, tainting: true};

        function $rb_lt(lhs, rhs) {
            return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs < rhs : lhs['$<'](rhs);
        }

        var $a, $b, TMP_1, self = Opal.top, $scope = Opal, nil = Opal.nil, $breaker = Opal.breaker, $slice = Opal.slice;

        Opal.add_stubs(['$==', '$require', '$register', '$basebackend?', '$<', '$safe', '$block_macro']);
        if ($scope.get('RUBY_ENGINE')['$==']("opal")) {
            self.$require(name + "-block-macro/extension")
        }
        ;
        return ($a = ($b = (($scope.get('Asciidoctor')).$$scope.get('Extensions'))).$register, $a.$$p = (TMP_1 = function () {
            var self = TMP_1.$$s || this, $a, $b;
            if (self.document == null) self.document = nil;

            if ((($a = ($b = (self.document['$basebackend?']("html")), $b !== false && $b !== nil ? ($rb_lt(self.document.$safe(), (($scope.get('SafeMode')).$$scope.get('SECURE')))) : $b)) !== nil && (!$a.$$is_boolean || $a == true))) {
                return self.$block_macro($scope.get(name + 'BlockMacro'))
            } else {
                return nil
            }
        }, TMP_1.$$s = self, TMP_1), $a).call($b);
    })(Opal);
}

// TODO: missing math
["uml", "plantuml", "ditaa", "graphviz","tree"].forEach(function (name) {
    registerUmlBlockMacro(name);
});