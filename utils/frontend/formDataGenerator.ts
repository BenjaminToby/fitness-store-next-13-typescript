type FormDataGeneratorProps = {
    form: HTMLFormElement;
};

export default function formDataGenerator({ form }: FormDataGeneratorProps): {
    data: any;
    error?: {
        msg: string;
    } | null;
} {
    const formElements = form.elements;
    const data: any = {};
    let error: any = null;

    for (let i = 0; i < formElements.length; i++) {
        try {
            const element: any = formElements[i];
            if (!element.name?.match(/./)) continue;

            if (element.required && !element.value?.match(/./)) {
                error = {
                    msg: `${element.name} is required`,
                };
                break;
            }

            if (element.type === "checkbox") {
                data[element.name] = element.checked;
                continue;
            }

            data[element.name] = element.value;
        } catch (error) {}
    }

    return { data, error };
}
