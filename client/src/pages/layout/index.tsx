import React, { ReactNode } from "react";
import "./styles.scss";
import Header from "@/components/Header";

interface Props {
  children: ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="layout">
      <div className="layout_header">
        <Header />
      </div>
      <div className="layout_content">
        <>{children}</>
      </div>
    </div>
  );
};

export default Layout;
