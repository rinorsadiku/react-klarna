import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

export default () => {
    const [html, setHTML] = useState(null);
    const data = useSelector(state => state.checkout);
    const klarnaCheckoutContainer = useRef(null);

    useEffect(() => {
        if (data) {
            setHTML(data.html_snippet.replace(/\\"/g, "\"").replace(/\\n/g, ""));
        }
    }, [data])

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
            <div id="klarna-checkout-container" ref={klarnaCheckoutContainer} dangerouslySetInnerHTML={{ __html: html || '' }}></div>
        </>
    )
};