import { WebServer } from "../../../../protocols/web/WebServer";
import { WebConnector } from "../../../../protocols/web/WebConnector";

const PORT = 10101;
const TOKEN = "asdfawe4fasdfchswrtgadfg";

interface IHeaders
{
    token: string;
}

export async function test_web_headers(): Promise<void>
{
    let server: WebServer<IHeaders, null> = new WebServer();
    await server.open(PORT, async acceptor =>
    {
        if (acceptor.headers.token !== TOKEN)
            await acceptor.reject();
        else
            await acceptor.accept();
    });

    let connector: WebConnector<IHeaders, null> = new WebConnector(null);
    await connector.connect(`ws://127.0.0.1:${PORT}`, { token: TOKEN });
    await connector.close();

    await server.close();
}