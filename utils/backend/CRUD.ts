import datasquirel from "datasquirel";

type CRUDProps = {
    table?: string;
    data?: any;
    identifierKey?: string;
    identifierValue?: string | number;
    update?: boolean;
    query?: string;
    queryValues?: string[] | any;
};

type CRUDIdentifier = {
    key: string | null | undefined;
    value: string | null | undefined;
};

class CRUD {
    props: CRUDProps;
    identifier: CRUDIdentifier;

    constructor(props: CRUDProps) {
        this.props = props;
        this.identifier = {
            key: this.props.data?.id ? "id" : this.props.identifierKey ? this.props.identifierKey : null,
            value: this.props.data?.id ? this.props.data.id : this.props.identifierValue ? this.props.identifierValue?.toString() : null,
        };
    }

    public async toggle() {
        const existing = await datasquirel.get({
            db: process.env.DATASQUIREL_DB_NAME || "",
            key: process.env.DATASQUIREL_READ_ONLY_API_KEY || "",
            query: `SELECT * FROM \`${this.props.table}\` WHERE \`${this.identifier.key}\` = ?`,
            queryValues: [this.identifier.value || ""],
        });

        if (existing.success && existing.payload && Array.isArray(existing.payload) && existing.payload.length > 0) {
            return await this.delete();
        } else {
            return await this.create();
        }
    }

    public async create() {
        const newEntry = await datasquirel.post({
            database: process.env.DATASQUIREL_DB_NAME || "",
            key: process.env.DATASQUIREL_FULL_ACCESS_API_KEY || "",
            query: {
                action: "insert",
                table: this.props.table || "",
                data: this.props.data,
                update: this.props.update,
                identifierColumnName: this.identifier.key,
                identifierValue: this.identifier.value,
                duplicateColumnName: this.identifier.key,
                duplicateColumnValue: this.identifier.value,
            },
        });

        return newEntry;
    }

    public async read() {
        const read = await datasquirel.get({
            db: process.env.DATASQUIREL_DB_NAME || "",
            key: process.env.DATASQUIREL_READ_ONLY_API_KEY || "",
            query: this.props.query || `SELECT * FROM ${this.props.table}`,
            queryValues: this.props.queryValues || [],
        });

        return read;
    }

    public async update() {
        const update = await datasquirel.post({
            database: process.env.DATASQUIREL_DB_NAME || "",
            key: process.env.DATASQUIREL_FULL_ACCESS_API_KEY || "",
            query: {
                action: "update",
                table: this.props.table || "",
                data: this.props.data,
                update: true,
                identifierColumnName: this.identifier.key,
                identifierValue: this.identifier.value,
            },
        });

        return update;
    }

    public async delete() {
        const deleteEntry = await datasquirel.post({
            database: process.env.DATASQUIREL_DB_NAME || "",
            key: process.env.DATASQUIREL_FULL_ACCESS_API_KEY || "",
            query: {
                action: "delete",
                table: this.props.table || "",
                update: true,
                identifierColumnName: this.identifier.key,
                identifierValue: this.identifier.value,
            },
        });

        return deleteEntry;
    }

    private async calc() {
        console.log("CRUD calc");
    }

    set setProps(props: CRUDProps) {
        this.props = props;
    }

    set setIdentifier(identifier: CRUDIdentifier) {
        this.identifier = identifier;
    }
}

export default CRUD;
export type { CRUDProps };
