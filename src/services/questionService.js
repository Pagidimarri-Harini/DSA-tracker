
export const getDataApi = async (qu) => {
    try {
        const res = await fetch(`${process.env.REACT_APP_DOMAIN}/q/view/${qu}`, {
            headers: {
                "authToken": localStorage.getItem("authToken")
            },
        })
        const resData = await res.json()
        return resData
    } catch (error) {
        throw error
    }
}

export const getSubmissionsApi = async (qu, key = 1) => {
    try {
        const res = await fetch(`${process.env.REACT_APP_DOMAIN}/q/submissions/${qu}/${key}`, {
            headers: {
                "authToken": localStorage.getItem("authToken")
            },
        })
        const resData = await res.json()
        return resData
    } catch (error) {
        throw error
    }
}

export const getCodeApi = async (qu, lang) => {
    try {
        const res = await fetch(`${process.env.REACT_APP_DOMAIN}/q/getCode/${qu}/${lang}`, {
            headers: {
                "authToken": localStorage.getItem("authToken")
            },
        })
        const resData = await res.text()
        return resData
    } catch (error) {
        throw error
    }
}

export const runCodeApi = async (qu, lang, code) => {
    try {
        const res = await fetch(`${process.env.REACT_APP_DOMAIN}/q/runCode/${qu}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authToken": localStorage.getItem("authToken")
            },
            body: JSON.stringify({
                lang, code
            })
        })
        const resData = await res.json()
        return resData
    } catch (error) {
        throw error
    }
}

export const submitCodeApi = async (qu, lang, code) => {
    try {
        const res = await fetch(`${process.env.REACT_APP_DOMAIN}/q/submitCode/${qu}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authToken": localStorage.getItem("authToken")
            },
            body: JSON.stringify({
                lang, code
            })
        })
        const resData = await res.json()
        return resData
    } catch (error) {
        throw error
    }
}
