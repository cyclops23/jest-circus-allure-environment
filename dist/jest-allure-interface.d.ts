/// <reference types="node" />
import { Allure, AllureRuntime, AllureStep, AllureTest, AttachmentOptions, ExecutableItemWrapper, Severity, Status, StepInterface } from 'allure-js-commons';
import StepWrapper from './step-wrapper';
import type AllureReporter from './allure-reporter';
/**
 * Supported content types for Allure attachments.
 *
 * _This enum was copied and extended from allure-js-commons_
 */
export declare enum ContentType {
    TEXT = "text/plain",
    XML = "application/xml",
    CSV = "text/csv",
    TSV = "text/tab-separated-values",
    CSS = "text/css",
    URI = "text/uri-list",
    SVG = "image/svg+xml",
    PNG = "image/png",
    JSON = "application/json",
    WEBM = "video/webm",
    JPEG = "image/jpeg",
    HTML = "text/html"
}
export default class JestAllureInterface extends Allure {
    private readonly reporter;
    jiraUrl: string;
    tmsUrl: string;
    constructor(reporter: AllureReporter, runtime: AllureRuntime, jiraUrl?: string);
    get currentExecutable(): AllureStep | AllureTest | ExecutableItemWrapper;
    set currentExecutable(executable: AllureStep | AllureTest | ExecutableItemWrapper);
    label(name: string, value: string): void;
    severity(severity: Severity): void;
    tag(tag: string): void;
    owner(owner: string): void;
    lead(lead: string): void;
    epic(epic: string): void;
    feature(feature: string): void;
    story(story: string): void;
    issue(name: string): void;
    tms(name: string): void;
    startStep(name: string): StepWrapper;
    step<T>(name: string, body: (step: StepInterface) => any): Promise<any>;
    logStep(name: string, status: Status, attachments?: Array<{
        name: string;
        content: string;
        type: ContentType | string | AttachmentOptions;
    }>): void;
    description(markdown: string): void;
    descriptionHtml(html: string): void;
    attachment(name: string, content: Buffer | string, type: ContentType | string | AttachmentOptions): void;
    testAttachment(name: string, content: Buffer | string, type: ContentType | string | AttachmentOptions): void;
    get currentTest(): AllureTest;
}
