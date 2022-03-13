import graphql from './graphql/graphql.service';
// Don't remove this comment. It's needed to format import lines nicely.
export default function (app) {
    console.log(app);
    app.configure(graphql);
}
