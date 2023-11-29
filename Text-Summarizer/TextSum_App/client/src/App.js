import React from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import RequestImg from './components/RequestImg';
import RequestUrl from "./components/RequestUrl";

function App() {
  return (
    <div className="w-full h-screen font-bodyfont text-black relative bg-gradient-to-b from-blue-50 to-transparent dark:from-blue-900 top-0 left-0 z-0 overflow-scroll">
      <Header title="Text Summarizer"/>
      <Home/>
      <section class="w-full mx-auto max-w-7xl my-10 justify-center items-center">
        <RequestImg/>
      </section>
      <section class="w-full mx-auto max-w-7xl my-10 justify-center items-center">
        <RequestUrl/>
      </section>
    </div>
  );
}

export default App;