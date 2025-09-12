/* Tiny BetterChatXApp API for Plugins
 * Was made Tiny by bads.tm
 * Version: 1.0
 * Author: Jiiks | http://jiiks.net
 * Date: 11/12/2015
 * Last Update: 11/12/2015
 * https://github.com/Jiiks/BetterChatXApp
 *
 * Plugin Template: https://gist.github.com/Jiiks/71edd5af0beafcd08956
 */

var BdApi = {
    get React() { return BDV2.react; },
    get ReactDOM() { return BDV2.reactDom; },
    get WindowConfigFile() {
        if (this._windowConfigFile) return this._windowConfigFile;
        const base = require("electron").remote.app.getAppPath();
        const path = require("path");
        const location = path.resolve(base, "..", "app", "config.json");
        const fs = require("fs");
        if (!fs.existsSync(path.resolve(base, "..", "app"))) return this._windowConfigFile = null;
        if (!fs.existsSync(location)) fs.writeFileSync(location, JSON.stringify({}));
        return this._windowConfigFile = location;
    }
};

BdApi.getAllWindowPreferences = function() {
    if (bdConfig.os !== "win32" || !this.WindowConfigFile) return {}; // Tempfix until new injection on other platforms
    return require(this.WindowConfigFile);
};

BdApi.getWindowPreference = function(key) {
    if (bdConfig.os !== "win32" || !this.WindowConfigFile) return undefined; // Tempfix until new injection on other platforms
    return this.getAllWindowPreferences()[key];
};

BdApi.setWindowPreference = function(key, value) {
    if (bdConfig.os !== "win32" || !this.WindowConfigFile) return; // Tempfix until new injection on other platforms
    const fs = require("fs");
    const prefs = this.getAllWindowPreferences();
    prefs[key] = value;
    delete require.cache[this.WindowConfigFile];
    fs.writeFileSync(this.WindowConfigFile, JSON.stringify(prefs, null, 4));
};

//Inject CSS to document head
//id = id of element
//css = custom css
BdApi.injectCSS = function (id, css) {
    $("head").append($("<style>", {id: Utils.escapeID(id), html: css}));
};

//Clear css/remove any element
//id = id of element
BdApi.clearCSS = function (id) {
    $("#" + Utils.escapeID(id)).remove();
};

//Inject CSS to document head
//id = id of element
//css = custom css
BdApi.linkJS = function (id, url) {
    $("head").append($("<script>", {id: Utils.escapeID(id), src: url, type: "text/javascript"}));
};

//Clear css/remove any element
//id = id of element
BdApi.unlinkJS = function (id) {
    $("#" + Utils.escapeID(id)).remove();
};

//Get another plugin
//name = name of plugin
BdApi.getPlugin = function (name) {
    if (bdplugins.hasOwnProperty(name)) {
        return bdplugins[name].plugin;
    }
    return null;
};

//var betterChatXIPC = require("electron").ipcRenderer;
//Get ipc for reason
BdApi.getIpc = function () {
    Utils.warn("[Deprecation Notice] BetterChatX's IPC has been deprecated and may be removed in future versions.");
    return betterChatXIPC;
};

//Get BetterChatX Core
BdApi.getCore = function () {
    return mainCore;
};

//Show modal alert
BdApi.alert = function (title, content) {
    // const ModalStack = EDApi.findModuleByProps("push", "update", "pop", "popWithKey");
    //     const AlertModal = EDApi.findModule(m => m.prototype && m.prototype.handleCancel && m.prototype.handleSubmit && m.prototype.handleMinorConfirm);
    //     if (!ModalStack || !AlertModal) return window.alert(body);
    //     ModalStack.push(function(props) {
    //         return EDApi.React.createElement(AlertModal, Object.assign({title, body}, props));
    //     });
    mainCore.alert(title, content);
};

//Show toast alert
BdApi.showToast = function(content, options = {}) {
    mainCore.showToast(content, options);
};

// Finds module
BdApi.findModule = function(filter) {
    return BDV2.WebpackModules.find(filter);
};

// Finds module
BdApi.findAllModules = function(filter) {
    return BDV2.WebpackModules.findAll(filter);
};

// Finds module
BdApi.findModuleByProps = function(...props) {
    return BDV2.WebpackModules.findByUniqueProperties(props);
};

// Gets react instance
BdApi.getInternalInstance = function(node) {
    if (!(node instanceof window.jQuery) && !(node instanceof Element)) return undefined;
    if (node instanceof jQuery) node = node[0];
    return BDV2.getInternalInstance(node);
};

// Gets data
BdApi.loadData = function(pluginName, key) {
    return DataStore.getPluginData(pluginName, key);
};

BdApi.getData = BdApi.loadData;

// Sets data
BdApi.saveData = function(pluginName, key, data) {
    return DataStore.setPluginData(pluginName, key, data);
};

BdApi.setData = BdApi.saveData;

// Deletes data
BdApi.deleteData = function(pluginName, key) {
    return DataStore.deletePluginData(pluginName, key);
};

// Patches other functions
BdApi.monkeyPatch = function(what, methodName, options) {
    return Utils.monkeyPatch(what, methodName, options);
};

// Event when element is removed
BdApi.onRemoved = function(node, callback) {
    return Utils.onRemoved(node, callback);
};

// Wraps function in try..catch
BdApi.suppressErrors = function(method, message) {
    return Utils.suppressErrors(method, message);
};

// Tests for valid JSON
BdApi.testJSON = function(data) {
    return Utils.testJSON(data);
};

BdApi.isPluginEnabled = function(name) {
    return !!pluginCookie[name];
};

BdApi.isThemeEnabled = function(name) {
    return !!themeCookie[name];
};

BdApi.isSettingEnabled = function(id) {
    return !!settingsCookie[id];
};

// Gets data
BdApi.getBDData = function(key) {
    return DataStore.getBDData(key);
};

// Sets data
BdApi.setBDData = function(key, data) {
    return DataStore.setBDData(key, data);
};


/**
 *
 * @constructor
 * @param {(HTMLElement|jQuery)} node - DOM node to monitor and show the tooltip on
 * @param {string} tip - string to show in the tooltip
 * @param {object} options - additional options for the tooltip
 * @param {string} [options.style=black] - correlates to the ChatX styling
 * @param {string} [options.side=top] - can be any of top, right, bottom, left
 * @param {boolean} [options.preventFlip=false] - prevents moving the tooltip to the opposite side if it is too big or goes offscreen
 * @param {boolean} [options.disabled=false] - whether the tooltip should be disabled from showing on hover
 */

/* BetterChatXApp DevMode JavaScript
 * Version: 1.0
 * Author: Jiiks | http://jiiks.net
 * Date: 22/05/2016
 * Last Update: 22/05/2016
 * https://github.com/Jiiks/BetterChatXApp
 */

 function devMode() {}

 devMode.prototype.enable = function(selectorMode) {
     var self = this;
     this.disable();
     $(window).on("keydown.bdDevmode", function(e) {
         if (e.which === 119 || e.which == 118) {//F8
            console.log("%c[%cDevMode%c] %cBreak/Resume", "color: red;", "color: #303030; font-weight:700;", "color:red;", "");
            debugger; // eslint-disable-line no-debugger
         }
     });

    if (!selectorMode) return;
     $(document).on("contextmenu.bdDevmode", function(e) {
         self.lastSelector = self.getSelector(e.toElement);

         function attach() {
            var cm = $(".contextMenu-HLZMGh");
            if (cm.length <= 0) {
                cm = $("<div class=\"contextMenu-HLZMGh bd-context-menu\"></div>");
                cm.addClass($(".app").hasClass("theme-dark") ? "theme-dark" : "theme-light");
                cm.appendTo(".app");
                cm.css("top", e.clientY);
                cm.css("left", e.clientX);
                $(document).on("click.bdDevModeCtx", () => {
                    cm.remove();
                    $(document).off(".bdDevModeCtx");
                });
                $(document).on("contextmenu.bdDevModeCtx", () => {
                    cm.remove();
                    $(document).off(".bdDevModeCtx");
                });
                $(document).on("keyup.bdDevModeCtx", (e) => {
                    if (e.keyCode === 27) {
                        cm.remove();
                        $(document).off(".bdDevModeCtx");
                    }
                });
            }

            var cmo = $("<div/>", {
                "class": "itemGroup-1tL0uz"
            });
            var cmi = $("<div/>", {
                "class": "item-1Yvehc",
                "click": function() {
                    BDV2.NativeModule.copy(self.lastSelector);
                    cm.hide();
                }
            }).append($("<span/>", {text: "Copy Selector"}));
            cmo.append(cmi);
            cm.append(cmo);
            if (cm.hasClass("undefined")) cm.css("top",  "-=" + cmo.outerHeight());
         }

         setImmediate(attach);

         e.stopPropagation();
     });
 };

devMode.prototype.getRules = function(element, css = element.ownerDocument.styleSheets) {
    //if (window.getMatchedCSSRules) return window.getMatchedCSSRules(element);
    return [].concat(...[...css].map(s => [...s.cssRules || []])).filter(r => r && r.selectorText && element.matches(r.selectorText) && r.style.length && r.selectorText.split(", ").length < 8);
};

devMode.prototype.getSelector = function(element) {
    if (element.id) return `#${element.id}`;
    const rules = this.getRules(element);
    const latestRule = rules[rules.length - 1];
    if (latestRule) return latestRule.selectorText;
    else if (element.classList.length) return `.${Array.from(element.classList).join(".")}`;
    return `.${Array.from(element.parentElement.classList).join(".")}`;
};

 devMode.prototype.disable = function() {
     $(window).off("keydown.bdDevmode");
     $(document).off("contextmenu.bdDevmode");
     $(document).off("contextmenu.bdDevModeCtx");
 };


var ClassNormalizer = (() => {
    const normalizedPrefix = "da";
    const randClass = new RegExp(`^(?!${normalizedPrefix}-)((?:[A-Za-z]|[0-9]|-)+)-(?:[A-Za-z]|[0-9]|-|_){6}$`);

    return new class ClassNormalizer {

        stop() {
            if (!this.hasPatched) return;
            this.unpatchClassModules(BdApi.findAllModules(this.moduleFilter.bind(this)));
            this.revertElement(document.querySelector("#app-mount"));
            this.hasPatched = false;
        }

        start() {
            if (this.hasPatched) return;
            this.patchClassModules(BdApi.findAllModules(this.moduleFilter.bind(this)));
            this.normalizeElement(document.querySelector("#app-mount"));
            this.hasPatched = true;
        }

        patchClassModules(modules) {
            for (const module of modules) {
                this.patchClassModule(normalizedPrefix, module);
            }
        }

        unpatchClassModules(modules) {
            for (const module of modules) {
                this.unpatchClassModule(normalizedPrefix, module);
            }
        }

        shouldIgnore(value) {
            if (!isNaN(value)) return true;
            if (value.endsWith("px") || value.endsWith("ch") || value.endsWith("em") || value.endsWith("ms")) return true;
            if (value.startsWith("#") && (value.length == 7 || value.length == 4)) return true;
            if (value.includes("calc(") || value.includes("rgba")) return true;
            return false;
        }

        moduleFilter(module) {
            if (typeof module !== "object" || Array.isArray(module)) return false;
            if (module.__esModule) return false;
            if (!Object.keys(module).length) return false;
            for (const baseClassName in module) {
                const value = module[baseClassName];
                if (typeof value !== "string") return false;
                if (this.shouldIgnore(value)) continue;
                if (value.split("-").length === 1) return false;
                if (!randClass.test(value.split(" ")[0])) return false;
            }

            return true;
        }

        patchClassModule(componentName, classNames) {
            for (const baseClassName in classNames) {
                const value = classNames[baseClassName];
                if (this.shouldIgnore(value)) continue;
                const classList = value.split(" ");
                for (const normalClass of classList) {
                    const match = normalClass.match(randClass)[1];
                    if (!match) continue; // Shouldn't ever happen since they passed the moduleFilter, but you never know
                    const camelCase = match.split("-").map((s, i) => i ? s[0].toUpperCase() + s.slice(1) : s).join("");
                    classNames[baseClassName] += ` ${componentName}-${camelCase}`;
                }
            }
        }

        unpatchClassModule(componentName, classNames) {
            for (const baseClassName in classNames) {
                const value = classNames[baseClassName];
                if (this.shouldIgnore(value)) continue;
                let newString = "";
                const classList = value.split(" ");
                for (const normalClass of classList) {
                    if (normalClass.startsWith(`${componentName}-`)) continue;
                    newString += ` ${normalClass}`;
                }
                classNames[baseClassName] = newString.trim();
            }
        }

        normalizeElement(element) {
            if (!(element instanceof Element)) return;
            const classes = element.classList;
            for (let c = 0, clen = classes.length; c < clen; c++) {
                if (!randClass.test(classes[c])) continue;
                const match = classes[c].match(randClass)[1];
                const newClass = match.split("-").map((s, i) => i ? s[0].toUpperCase() + s.slice(1) : s).join("");
                element.classList.add(`${normalizedPrefix}-${newClass}`);
            }
            for (const child of element.children) this.normalizeElement(child);
        }

        revertElement(element) {
            if (!(element instanceof Element)) return;
            if (element.children && element.children.length) this.revertElement(element.children[0]);
            if (element.nextElementSibling) this.revertElement(element.nextElementSibling);
            const classes = element.classList;
            const toRemove = [];
            for (let c = 0; c < classes.length; c++) {
                if (classes[c].startsWith(`${normalizedPrefix}-`)) toRemove.push(classes[c]);
            }
            element.classList.remove(...toRemove);
        }

    };
})();

console.log("%c[%cDevMode%c] %cTinyBD Initialized", "color: red; font-weight:700;", "color: #303030; font-weight:700;", "color:red;", "");
