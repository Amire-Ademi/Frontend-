import * as React from "react";
import { cn } from "@/lib/utils";


const CardHeader = ({ children }) => {

    return (
      <div className="card-header">
        {children}
      </div>
    );
  };
  
  export {CardHeader} ;
  