"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentType = void 0;
const allure_js_commons_1 = require("allure-js-commons");
const step_wrapper_1 = require("./step-wrapper");
/**
 * Supported content types for Allure attachments.
 *
 * _This enum was copied and extended from allure-js-commons_
 */
var ContentType;
(function (ContentType) {
    // Allure-js-commons ContentTypes:
    ContentType["TEXT"] = "text/plain";
    ContentType["XML"] = "application/xml";
    ContentType["CSV"] = "text/csv";
    ContentType["TSV"] = "text/tab-separated-values";
    ContentType["CSS"] = "text/css";
    ContentType["URI"] = "text/uri-list";
    ContentType["SVG"] = "image/svg+xml";
    ContentType["PNG"] = "image/png";
    ContentType["JSON"] = "application/json";
    ContentType["WEBM"] = "video/webm";
    ContentType["JPEG"] = "image/jpeg";
    // Custom extensions:
    ContentType["HTML"] = "text/html";
})(ContentType = exports.ContentType || (exports.ContentType = {}));
class JestAllureInterface extends allure_js_commons_1.Allure {
    constructor(reporter, runtime, jiraUrl) {
        super(runtime);
        this.reporter = reporter;
        this.tmsUrl = '';
        this.jiraUrl = jiraUrl !== null && jiraUrl !== void 0 ? jiraUrl : '';
    }
    get currentExecutable() {
        var _a, _b;
        const executable = (_b = (_a = this.reporter.currentStep) !== null && _a !== void 0 ? _a : this.reporter.currentTest) !== null && _b !== void 0 ? _b : this.reporter.currentExecutable;
        if (!executable) {
            throw new Error('No executable!');
        }
        return executable;
    }
    set currentExecutable(executable) {
        this.reporter.currentExecutable = executable;
    }
    label(name, value) {
        this.currentTest.addLabel(name, value);
    }
    severity(severity) {
        this.label(allure_js_commons_1.LabelName.SEVERITY, severity);
    }
    tag(tag) {
        this.currentTest.addLabel(allure_js_commons_1.LabelName.TAG, tag);
    }
    owner(owner) {
        this.label(allure_js_commons_1.LabelName.OWNER, owner);
    }
    lead(lead) {
        this.label(allure_js_commons_1.LabelName.LEAD, lead);
    }
    epic(epic) {
        this.label(allure_js_commons_1.LabelName.EPIC, epic);
    }
    feature(feature) {
        this.label(allure_js_commons_1.LabelName.FEATURE, feature);
    }
    story(story) {
        this.label(allure_js_commons_1.LabelName.STORY, story);
    }
    issue(name) {
        this.link(this.jiraUrl, name, allure_js_commons_1.LinkType.ISSUE);
    }
    tms(name) {
        this.link(this.tmsUrl, name, allure_js_commons_1.LinkType.TMS);
    }
    startStep(name) {
        const allureStep = this.currentExecutable.startStep(name);
        this.reporter.pushStep(allureStep);
        return new step_wrapper_1.default(this.reporter, allureStep);
    }
    // @ts-expect-error
    async step(name, body) {
        const wrappedStep = this.startStep(name);
        let result;
        try {
            result = wrappedStep.run(body);
        }
        catch (error) {
            wrappedStep.endStep();
            throw error;
        }
        if ((0, allure_js_commons_1.isPromise)(result)) {
            const promise = result;
            try {
                const resolved = await promise;
                wrappedStep.endStep();
                return resolved;
            }
            catch (error) {
                wrappedStep.endStep();
                throw error;
            }
        }
        wrappedStep.endStep();
        return result;
    }
    logStep(name, status, attachments) {
        const step = this.startStep(name);
        step.status = status;
        if (attachments) {
            for (const a of attachments) {
                this.attachment(a.name, a.content, a.type);
            }
        }
        step.endStep();
    }
    description(markdown) {
        const { currentTest } = this.reporter;
        if (!currentTest) {
            throw new Error('Expected a test to be executing before adding a description.');
        }
        currentTest.description = markdown;
    }
    descriptionHtml(html) {
        const { currentTest } = this.reporter;
        if (!currentTest) {
            throw new Error('Expected a test to be executing before adding an HTML description.');
        }
        currentTest.descriptionHtml = html;
    }
    attachment(name, content, type) {
        const file = this.reporter.writeAttachment(content, type);
        this.currentExecutable.addAttachment(name, type, file);
    }
    testAttachment(name, content, type) {
        const file = this.reporter.writeAttachment(content, type);
        this.currentTest.addAttachment(name, type, file);
    }
    get currentTest() {
        if (!this.reporter.currentTest) {
            throw new Error('No test running!');
        }
        return this.reporter.currentTest;
    }
}
exports.default = JestAllureInterface;
//# sourceMappingURL=jest-allure-interface.js.map