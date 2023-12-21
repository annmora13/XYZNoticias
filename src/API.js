export const getNewsTitle = async (title) => {
    const apiKey = "2eb80da01b6f4cd8bfd0bfb79190431e";
    const baseUrl = "https://newsapi.org/v2/top-headlines";
    const url = `${baseUrl}?q=${title}&apiKey=${apiKey}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status}`);
        }

        const data = await response.json();
        console.log("data.articles:", data);

        return data.articles;
    } catch (error) {
        console.error(error);
        return [];
    }
};
export const getNewsCategory = async (category) => {
    const apiKey = "2eb80da01b6f4cd8bfd0bfb79190431e";
    const baseUrl = "https://newsapi.org/v2/top-headlines";
    const country = "us";
    const url = `${baseUrl}?country=${country}&category=${category}&apiKey=${apiKey}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status}`);
        }

        const data = await response.json();
        return data.articles;
    } catch (error) {
        console.error(error);
        return [];
    }
};
