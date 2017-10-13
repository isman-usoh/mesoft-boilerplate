
export const enum HTTP_CODES {
    CONTINUE = 100,
    SWITCHING_PROTOCOLS = 101,
    OK = 200,
    CREATED = 201,
    ACCEPTED = 202,
    NON_AUTHORITATIVE_INFORMATION = 203,
    NO_CONTENT = 204,
    RESET_CONTENT = 205,
    PARTIAL_CONTENT = 206,
    MULTIPLE_CHOICES = 300,
    MOVED_PERMANENTLY = 301,
    FOUND = 302,
    SEE_OTHER = 303,
    NOT_MODIFIED = 304,
    USE_PROXY = 305,
    TEMPORARY_REDIRECT = 307,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    PAYMENT_REQUIRED = 402,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    METHOD_NOT_ALLOWED = 405,
    NOT_ACCEPTABLE = 406,
    PROXY_AUTHENTICATION_REQUIRED = 407,
    REQUEST_TIMEOUT = 408,
    CONFLICT = 409,
    GONE = 410,
    LENGTH_REQUIRED = 411,
    PRECONDITION_FAILED = 412,
    REQUEST_ENTITY_TOO_LARGE = 413,
    REQUEST_URI_TOO_LONG = 414,
    UNSUPPORTED_MEDIA_TYPE = 415,
    REQUESTED_RANGE_NOT_SATISFIABLE = 416,
    EXPECTATION_FAILED = 417,
    UNPROCESSABLE_ENTITY = 422,
    TOO_MANY_REQUESTS = 429,
    INTERNAL_SERVER_ERROR = 500,
    NOT_IMPLEMENTED = 501,
    BAD_GATEWAY = 502,
    SERVICE_UNAVAILABLE = 503,
    GATEWAY_TIMEOUT = 504,
    HTTP_VERSION_NOT_SUPPORTED = 505,
}

// tslint:disable-next-line:interface-name
export interface ErrorResponse {
    /**
     * สถานะของ Http
     */
    statusCode: number;
    /**
     * ชื่อข้อผิดผลาด
     */
    name: string;
    /**
     * ข้อความข้อผิดผลาด
     */
    message?: string;

    fields?: Field[];
}

// tslint:disable-next-line:interface-name
interface Field {
    name: string;
    message?: string;
    value?: string;
}

export class ApiError extends Error {
    private statusCode: number;
    private fields: Field[];
    constructor(name: string = "ApiError", statusCode: number = HTTP_CODES.BAD_REQUEST, message?: string, fields?: Field[]) {
        super(message);
        this.name = name;
        this.statusCode = statusCode;
        this.fields = fields;
    }
}

// tslint:disable-next-line:max-classes-per-file
export class OrderError extends ApiError {
    constructor(message?: string, fields?: Field[]) {
        super("OrderError", HTTP_CODES.BAD_REQUEST, message, fields);
    }
}

// tslint:disable-next-line:max-classes-per-file
export class NotSupportShippingError extends ApiError {
    constructor(message?: string) {
        super("NotSupportShippingError", HTTP_CODES.BAD_REQUEST, message);
    }
}

// tslint:disable-next-line:max-classes-per-file
export class ReCaptchaError extends ApiError {
    constructor(message?: string) {
        super("ReCaptchaError", HTTP_CODES.BAD_REQUEST, message);
    }
}

// tslint:disable-next-line:max-classes-per-file
export class CouponNotFount extends ApiError {
    constructor(message?: string) {
        super("CouponNotFount", HTTP_CODES.NOT_FOUND, message);
    }
}

// tslint:disable-next-line:max-classes-per-file
export class AccessDenied extends ApiError {
    constructor(message?: string) {
        super("AccessDenied", HTTP_CODES.METHOD_NOT_ALLOWED, message);
    }
}

// tslint:disable-next-line:max-classes-per-file
export class EmailOrPasswordInvalid extends ApiError {
    constructor(message?: string) {
        super("EmailOrPasswordInvalid", HTTP_CODES.BAD_REQUEST, message);
    }
}

// tslint:disable-next-line:max-classes-per-file
export class FileNotSupport extends ApiError {
    constructor(message?: string) {
        super("FileNotSupport", HTTP_CODES.BAD_REQUEST, message);
    }
}

// tslint:disable-next-line:max-classes-per-file
export class Unauthorized extends ApiError {
    constructor(message?: string) {
        super("Unauthorized", HTTP_CODES.UNAUTHORIZED, message);
    }
}

// tslint:disable-next-line:max-classes-per-file
export class UserNotFount extends ApiError {
    constructor(message?: string) {
        super("UserNotFount", HTTP_CODES.NOT_FOUND, message);
    }
}

// tslint:disable-next-line:max-classes-per-file
export class EmailDuplicateError extends ApiError {
    constructor(message?: string) {
        super("EmailDuplicateError", HTTP_CODES.CONFLICT, message);
    }
}

// tslint:disable-next-line:max-classes-per-file
export class NotFound extends ApiError {
    constructor(message?: string) {
        super("NotFound", HTTP_CODES.NOT_FOUND, message);
    }
}

// tslint:disable-next-line:max-classes-per-file
export class CreateForgetPasswordError extends ApiError {
    constructor(message?: string) {
        super("CreateForgetPasswordError", HTTP_CODES.BAD_REQUEST, message);
    }
}

// tslint:disable-next-line:max-classes-per-file
export class ImageSelectNotFount extends ApiError {
    constructor(message?: string) {
        super("ImageSelectNotFount", HTTP_CODES.NOT_FOUND, message);
    }
}

// tslint:disable-next-line:max-classes-per-file
export class ProductNotFount extends ApiError {
    constructor(message?: string) {
        super("ProductNotFount", HTTP_CODES.NOT_FOUND, message);
    }
}

// tslint:disable-next-line:max-classes-per-file
export class DocumentNotFount extends ApiError {
    constructor(message?: string) {
        super("DocumentNotFount", HTTP_CODES.BAD_REQUEST, message);
    }
}
