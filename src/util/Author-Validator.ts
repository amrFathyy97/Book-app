import Ajv, { JSONSchemaType }  from "ajv";

const ajv = new Ajv();

export interface IAuthor {
    fname: string,
    lname: string,
    nationality: string
}

const schema: JSONSchemaType<IAuthor> = {
    type: "object",
    properties: {
        fname: {"type": "string"},
        lname: {"type": "string"},
        nationality: {"type": "string"}
    },
    required: ["fname", "lname", "nationality"]
}

const validate = ajv.compile(schema);

export default validate