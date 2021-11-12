import { BrowserRouter, Switch, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import AwardingBody from "./pages/AwardingBody";
import Course from "./pages/Course";
import Home from "./pages/Home";
import Login from "./pages/login/Login";
import ResourceType from "./pages/ResourceType";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <section>
          <Switch>
            <Route path="/" exact component={Login} />
            <Layout>
              <Route exact path="/admin/home" component={Home} />
              <Route exact path="/courses" component={Course} />
              <Route exact path="/awarding_bodies" component={AwardingBody} />
              <Route exact path="/resources_types" component={ResourceType} />
            </Layout>
          </Switch>
        </section>
      </BrowserRouter>
    </div>
  );
}

export default App;
