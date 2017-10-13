import * as React from "react";
import * as Helmet from "react-helmet";

export class Html extends React.Component<IProps, {}> {
    render() {
        const initialState = JSON.stringify(this.props.initialState);
        const helmet = Helmet.default.renderStatic();

        return (
            <html {...helmet.htmlAttributes.toComponent() }>
                <head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# product: http://ogp.me/ns/product#">
                    {helmet.title.toComponent()}
                    {helmet.base.toComponent()}
                    {helmet.meta.toComponent()}
                    {helmet.link.toComponent()}

                    {
                        Object.keys(this.props.styles).map((key, i) =>
                            <link href={this.props.styles[key]} key={i} media="screen, projection" rel="stylesheet" type="text/css" />,
                        )
                    }
                </head>
                <body {...helmet.bodyAttributes.toComponent() }>
                    <div id="app" dangerouslySetInnerHTML={{ __html: this.props.content }}></div>
                    <script dangerouslySetInnerHTML={{ __html: `window.__INITIAL_STATE__=${initialState};` }} />
                    {__DEVELOPMENT__ &&
                        <script charSet="UTF-8" src="http://localhost:3001/assets/build/vendor.dll.js"></script>
                    }
                    <script charSet="UTF-8" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
                    <script charSet="UTF-8" src="https://cdnjs.cloudflare.com/ajax/libs/tether/1.4.0/js/tether.min.js"></script>
                    <script charSet="UTF-8" src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0-alpha.6/js/bootstrap.min.js"></script>
                    <script charSet="UTF-8" src={this.props.javascript.main}></script>

                    {helmet.noscript.toComponent()}
                    {helmet.script.toComponent()}
                </body>
            </html>
        );
    }
}
interface IProps {
    content: any;
    initialState: any;
    javascript: any;
    styles: any;
}
