import { BrowserRouter, Switch, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import AwardingBody from "./pages/AwardingBody";
import Resource from "./pages/Resource";
import Home from "./pages/Home";
import Login from "./pages/login/Login";
import ResourceType from "./pages/ResourceType";
import Course from "./pages/Course";
import Register from "./pages/Register/Register";
import Brand from "./pages/Brand";
import MockExam from "./pages/MockExam";
import ResourceName from "./pages/ResourceName";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <section>
          <Switch>
            <Route path="/" exact component={Login} />
            <Route exact path="/register" component={Register} />
            <Layout>
              <Route exact path="/admin/home" component={Home} />
              <Route exact path="/courses" component={Course} />
              <Route path ="/resources" component={Resource} />
              <Route exact path="/awarding_bodies" component={AwardingBody} />
              <Route exact path="/resources_types" component={ResourceType} />
              <Route exact path="/brands" component={Brand} />
              <Route exact path="/resource-name" component={ResourceName} />
            </Layout>
          </Switch>
        </section>
      </BrowserRouter>
    </div>
  );
}

export default App;
