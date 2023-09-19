import "./App.css";
import "./reset.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { setContext } from "@apollo/client/link/context";
import Homepage from "./components/Pages/Homepage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Pages/Layout";
import Login from "./components/Pages/Login";
import Signup from "./components/Pages/Signup";
import MyProfile from "./components/Pages/MyProfile";
import Settings from "./components/Pages/Settings";
import NewScript from "./components/Pages/NewScript";
const uploadLink = createUploadLink({ uri: "/graphql" });
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(uploadLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Homepage />} />
            <Route path="profile/:userId" element={<MyProfile />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="me" element={<MyProfile />} />
            <Route path="settings" element={<Settings />} />
            <Route path="new" element={<NewScript />}></Route>
            <Route path="edit/:postId" element={<NewScript />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
