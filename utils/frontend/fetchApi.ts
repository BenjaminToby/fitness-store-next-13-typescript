type FetchOptions =
    | {
          method: string;
          body: object;
          headers?: {
              "Content-Type"?: string;
              "x-csrf-auth"?: string;
          };
      }
    | string
    | undefined
    | null;

/**
 * Fetch Function
 * ==============================================================================
 * @async
 *
 * @param {string} url - Admin or Site page
 * @param {FetchOptions} options - options object or string: **optional
 * @param {boolean} csrf - Add CSRF?
 *
 * @returns {Promise<object>}
 */
export default async function fetchApi(url: string, options?: FetchOptions | any, csrf?: boolean): Promise<object> {
    /** ********************* Initialize data variable */
    let data;

    ////////////////////////////////////////
    ////////////////////////////////////////
    ////////////////////////////////////////

    if (typeof options === "string") {
        try {
            let fetchData;
            switch (options) {
                case "post":
                    fetchData = await fetch(url, {
                        method: options,
                        // @ts-ignore
                        headers: {
                            "Content-Type": "application/json",
                            "x-csrf-auth": csrf ? (localStorage.getItem("csrf") ? localStorage.getItem("csrf") : "") : "",
                        },
                    });
                    data = fetchData.json();
                    break;

                default:
                    fetchData = await fetch(url);
                    data = fetchData.json();
                    break;
            }
        } catch (error) {
            data = null;
        }

        ////////////////////////////////////////
        ////////////////////////////////////////
        ////////////////////////////////////////
    } else if (typeof options === "object") {
        try {
            let fetchData;

            /** ********************* Convert body to JSON if not JSON */
            if (options?.body && typeof options.body === "object") {
                let oldOptionsBody = options.body;
                options.body = JSON.stringify(oldOptionsBody);
            }

            ////////////////////////////////////////
            ////////////////////////////////////////
            ////////////////////////////////////////

            if (options?.headers) {
                ////////////////////////////////////////
                options.headers["x-csrf-auth"] = csrf ? localStorage.getItem("csrf") : "";
                fetchData = await fetch(url, options);
                ////////////////////////////////////////
            } else {
                fetchData = await fetch(url, {
                    ...options,
                    headers: {
                        "Content-Type": "application/json",
                        "x-csrf-auth": csrf ? localStorage.getItem("csrf") : "",
                    },
                });
            }

            ////////////////////////////////////////
            ////////////////////////////////////////
            ////////////////////////////////////////

            data = fetchData.json();

            ////////////////////////////////////////
            ////////////////////////////////////////
            ////////////////////////////////////////
        } catch (error) {
            data = null;
        }

        ////////////////////////////////////////
        ////////////////////////////////////////
        ////////////////////////////////////////
    } else {
        try {
            let fetchData = await fetch(url);
            data = fetchData.json();

            ////////////////////////////////////////
            ////////////////////////////////////////
            ////////////////////////////////////////
        } catch (error) {
            data = null;
        }
    }

    ////////////////////////////////////////
    ////////////////////////////////////////
    ////////////////////////////////////////

    return data;
}
