import { Affix, Drawer, Image, Layout } from "antd";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Sidenav from "../Sidenav/Sidenav";
import Footer from "./Footer";
import Header from "./Header";
import styles from "./Main.module.css";
import QuickLinks from "./QuickLinks";
import logo from '../../assets/Aciahea.svg'

const { Header: AntHeader, Content, Sider } = Layout;

function Main({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [sideNavOpenKeys, setSideNavOpenKeys] = useState("");

  const sideNavOpenKeysHandler = (val) => {
    setSideNavOpenKeys(val);
  };

  const handleCollapsed = (val) => {
    setCollapsed(val);
  };

  const [visible, setVisible] = useState(false);
  const [placement, setPlacement] = useState("right");
  const [sidenavColor, setSidenavColor] = useState("#FE4F00");
  const [sidenavType, setSidenavType] = useState("transparent");
  const [fixed, setFixed] = useState(false);

  const openDrawer = () => setVisible(!visible);
  const handleSidenavType = (type) => setSidenavType(type);
  const handleSidenavColor = (color) => setSidenavColor(color);
  const handleFixedNavbar = (type) => setFixed(type);

  let { pathname } = useLocation();
  pathname = pathname.replace("/", " ");

  useEffect(() => {
    if (pathname === "rtl") {
      setPlacement("left");
    } else {
      setPlacement("right");
    }
  }, [pathname]);

  const isLogged = Boolean(localStorage.getItem("isLogged"));

  return (
    <Layout className={styles.mainLayout}>
      {isLogged && (
        <Drawer
          title={false}
          placement={placement === "right" ? "left" : "right"}
          closable={false}
          onClose={() => setVisible(false)}
          visible={visible}
          key={placement === "right" ? "left" : "right"}
          width={220}
        >
          <Layout>
            <Sider
              trigger={null}
              width={220}
              theme="light"
              className={styles.siderDrawer}
            >
            
              <Sidenav  color={sidenavColor} sideNavOpenKeys={sideNavOpenKeys} />
            </Sider>
          </Layout>
        </Drawer>
      )}
      {isLogged && (
        <Sider
          breakpoint="lg"
          trigger={null}
          collapsible
          collapsed={collapsed}
          width={220}
          theme="light"
          className={`overflow-hidden ${styles.siderMain}`}
        >
          {collapsed ? (
            ""
          ) : (
            <div>
              <h3 className="text-black ms-5 my-1 ">
                Custom{" "}
                <strong style={{ color: "#000	", fontWeight: "bold" }}>
        ERP
                </strong>
              </h3>
            </div>
          )}
          {isLogged && (
            <>
            {/* <div className="w-full flex justify-between ms-1 mr-4 items-center pl-2 pr-1 bg-[#F9FAFB] border border-[#D0D5DD] py-[3px]">
		<p className="text-base"><Image src={logo} preview={false} alt="logo" width={20}  className="mx-auto" /> Achaia Studio</p>
		<p>Basic</p>
	</div> */}
            <Sidenav color={sidenavColor} sideNavOpenKeys={sideNavOpenKeys} />
            </>
          )}
        </Sider>
      )}
      <Layout
        className={
          isLogged
            ? collapsed
              ? styles.mainLayoutUncollapse
              : styles.mainLayoutCollapse
            : styles.mainLayoutMarginLeftZero
        }
      >
        {fixed ? (
          <Affix>
            <AntHeader >
              <Header
                onPress={openDrawer}
                name={pathname}
                subName={pathname}
                handleSidenavColor={handleSidenavColor}
                handleSidenavType={handleSidenavType}
                handleFixedNavbar={handleFixedNavbar}
                collapsed={collapsed}
                handleCollapsed={handleCollapsed}
                isLogged={isLogged}
              />
            </AntHeader>
          </Affix>
        ) : (
          <AntHeader>
            <Header
              onPress={openDrawer}
              name={pathname}
              subName={pathname}
              handleSidenavColor={handleSidenavColor}
              handleSidenavType={handleSidenavType}
              handleFixedNavbar={handleFixedNavbar}
              collapsed={collapsed}
              handleCollapsed={handleCollapsed}
            />
          </AntHeader>
        )}
        {isLogged &&
          (pathname.trim() === "dashboard" || pathname.trim() === "") && (
            <QuickLinks
            
              sideNavOpenKeys={sideNavOpenKeys}
              sideNavOpenKeysHandler={sideNavOpenKeysHandler}
            />
          )}

        <Content>{children}</Content>
        {/* <Footer /> */}
      </Layout>
    </Layout>
  );
}

export default Main;
