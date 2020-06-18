import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'utils/axios';
import queryString from 'query-string';

export default (props) => {
    const [html, setHTML] = useState(null);
    const klarnaCheckoutContainer = useRef(null);
    const values = queryString.parse(props.location.search)

    const getCurrentOrder = useCallback(async () => {
        try {
            if (values.oid) {
                const response = await axios.get(`/checkout/v3/orders/${values.oid}`, {
                    auth: {
                        username: process.env.REACT_APP_KLARNA_USERNAME,
                        password: process.env.REACT_APP_KLARNA_PASSWORD
                    }
                });
                if (response) setHTML(response.data.html_snippet);
            } else {
                throw new Error('Missing Order Id');
            }
        } catch (err) {
            console.log(err);
        }
    }, [values.oid]);


    useEffect(() => {
        getCurrentOrder();
    }, [getCurrentOrder])

    useEffect(() => {
        if (html) {
            const scriptsTags = klarnaCheckoutContainer.current.getElementsByTagName('script');
            for (let i = 0; i < scriptsTags.length; i++) {
                let parentNode = scriptsTags[i].parentNode;
                let newScriptTag = document.createElement('script');
                newScriptTag.type = 'text/javascript';
                newScriptTag.text = scriptsTags[i].text;
                parentNode.removeChild(scriptsTags[i]);
                parentNode.appendChild(newScriptTag);
            }
        }
    }, [html])

    return (
        <>
            <div ref={klarnaCheckoutContainer} dangerouslySetInnerHTML={{ __html: html || '' }} />
        </>
    )
};