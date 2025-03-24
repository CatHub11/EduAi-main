import React from "react";
import Topleftcard from "./leftcards/Topleftcard";
import Middleleftcard from "./leftcards/Middleleftcard";
import Bottomleftcard from "./leftcards/Bottomleftcard";
import Calendar from "../../Calendar/Calendar";

const Leftcardlayout = () => {
  return (
    <div className="grid  gap-2">
      <Calendar />
      <Middleleftcard/>
      <Bottomleftcard />
       
    </div>
  );
};

export default Leftcardlayout;
