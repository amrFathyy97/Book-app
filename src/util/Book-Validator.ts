import Ajv, { JSONSchemaType } from "ajv";

export interface IBook {
    title: string;
    price: number;
}

const ajv = new Ajv();

const schema: JSONSchemaType<IBook> = {
    type: "object",
    properties: {
        title: {type: "string", minLength: 5, maxLength: 100},
        price: {type: "number", minimum: 5, maximum: 1000},
        authorId: {type: "number"}
    },
    required: ["title", "price"]
};

const validate = ajv.compile(schema);

export default validate