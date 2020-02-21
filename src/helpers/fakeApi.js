export function configureFakeBackend() {
    let users = [{id: 1, email: 'test@test.com', password: 'test'}];
    const authors = [
        {id: "1", name: "Unnamed Author 1"},
        {id: "2", name: "Unnamed Author 2"},
        {id: "3", name: "Unnamed Author 3"},
        {id: "4", name: "Unnamed Author 4"},
        {id: "5", name: "Unnamed Author 5"}
    ];
    let realFetch = window.fetch;
    window.fetch = function (url, opts) {
        const isLoggedIn = opts.headers && opts.headers['Authorization'] === 'Bearer fake-jwt-token';

        return new Promise((resolve, reject) => {
            // wrap in timeout to simulate server api call
            setTimeout(() => {
                // authenticate - public
                if (url.endsWith('/users/authenticate') && opts.method === 'POST') {
                    const params = JSON.parse(opts.body);
                    const user = users.find(x => x.email === params.email && x.password === params.password);
                    if (!user) return error('email or password is incorrect');
                    return ok({
                        token: 'fake-jwt-token'
                    });
                }

                // register - public
                if (url.endsWith('/users/register') && opts.method === 'POST') {
                    const params = JSON.parse(opts.body);
                    users.push({
                        id: users[users.length - 1].id + 1,
                        email: params.email,
                        password: params.password
                    });
                    return ok();
                }

                // get users - secure
                if (url.endsWith('/authors') && opts.method === 'GET') {
                    if (!isLoggedIn) return unauthorised();
                    return ok(authors);
                }

                const regex = new RegExp('\\d');
                const n = url.lastIndexOf('/');
                if (url.substring(n + 1).match(regex) && opts.method === 'GET') {
                    if (!isLoggedIn) return unauthorised();
                    const id = parseInt(url.substring(n + 1));
                    const author = authors.find(author => author.id === id);
                    return ok(author);
                }

                // pass through any requests not handled above
                realFetch(url, opts).then(response => resolve(response));

                // private helper functions

                function ok(body) {
                    resolve({ok: true, text: () => Promise.resolve(JSON.stringify(body))})
                }

                function unauthorised() {
                    resolve({ status: 401, text: () => Promise.resolve(JSON.stringify({ message: 'Unauthorised' })) })
                }

                function error(message) {
                    resolve({ status: 400, text: () => Promise.resolve(JSON.stringify({ message })) })
                }
            }, 500);
        });
    }
}