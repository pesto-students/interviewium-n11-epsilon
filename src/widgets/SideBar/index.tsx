import styles from "./index.module.scss";
import React, {
  useEffect,
  useState,
} from "react";
import useDynamicRefs from "use-dynamic-refs";
import ProfilePhoto from "../../utilities/images/useravatar.svg";
import { Accordion, Card } from "react-bootstrap";
import { Link,
 } from "react-router-dom";

import { Back, BackDown } from "../../utilities/images/icons/index";
import { sidebarItemsMap } from "./sidebarItems";
import { SideLogout } from "../../utilities/images/icons/index";
import ModalComponent from "widgets/Modal";
import { useSelector } from "react-redux";
import { RootState } from "../../_store/reducer/rootReducer";
interface Props {
  toggleParentOpen: Function;
  parentOpen: boolean;
  user: any;
}
const SideBar = ({ toggleParentOpen, parentOpen, user }: Props) => {
  const [open, setOpen] = useState(false as boolean);
  const [activeId, setActiveId] = useState<any>("1");
  const [modalShow, setModalShow] = React.useState(false);
  const [modalInfo, setModalInfo] = React.useState({});
  const [getRef, setRef] = useDynamicRefs();
  const [name, setName] = useState<string>("");
  let [pathPageId, setPathPageId] = useState<string>("");

  const [pagePath] = useSelector((state: RootState) => {
    if (state.pagePath.id && pathPageId !== state.pagePath.id) {
      pathPageId = state.pagePath.id;
      setPathPageId(state.pagePath.id);
    }
    return [state.pagePath.pagePath];
  });
  const handleClickOpen = () => {
    setModalInfo({
      modalIdentity: "Logout",
  
    });
    setModalShow(true);
  };
  const hideModal = () => {
    setModalShow(false);
    setTimeout(() =>  300);
  };
  useEffect(() => {
    if (!parentOpen) {
      const selectedRef: any = getRef(activeId);
      if (selectedRef) {
        selectedRef?.current?.click();
      }
    }
    setOpen(parentOpen);

    if (false) {
      console.log("~~~ pagePath: ", pagePath);
    }
  }, [parentOpen]);
  useEffect(() => {
    setName(user?.name);
  }, [user]);
  const toggleActive = (id) => {
    if (activeId === id) {
      setActiveId(null);
    } else {
      setActiveId(id);
    }
  };

  const some : any  = localStorage.getItem('user')

  return (
    <>
      <div
        className={`${styles.sfnsidebar} ${
          open ? styles.openSidebar : styles.closeSidebar
        }`}
      >
        <div className={styles.navrightBorder}>
          <div className={styles.rightborder}></div>
          <div className={styles.UserManagement}>
            <img
              className={styles.userPhoto}
              src={user?.image_data ? user?.image_data : ProfilePhoto}
              alt="avatar"
            ></img>
            <div className={styles.profileN}>
              <div className={`${styles.userName}`}>{name}</div>
              <div className={styles.userAccno}>
                Account No.: #{user?.accountno}
              </div>
            </div>
          </div>
          <div className={styles.compName}>Intervierwium</div>
          <Accordion
            onClick={() => {
              if (!open) {
                toggleParentOpen();
              }
            }}
            defaultActiveKey={activeId}
          >
            {sidebarItemsMap.get(user?.role)&&sidebarItemsMap.get(user?.role).length && sidebarItemsMap.get(user?.role).map((item, index) => {
              return item.subItems ? (
                <div key={index} className={styles.subItemAccordion}>
                  <Accordion.Toggle
                    ref={setRef(index.toString())}
                    className={styles.cardHeader}
                    as={Card.Header}
                    eventKey={index.toString()}
                    onClick={() => toggleActive(index.toString())}
                  >
                    <div
                      key={index}
                      className={`d-flex justify-content-between ${
                        pagePath?.itemPathPage === item.title
                          ? styles.sidebarNavSelected
                          : styles.sidebarNav
                      }`}
                    >
                      <div className="d-flex align-items-center">
                        <div className={styles.iconSet}>
                          <item.Icon className={styles.sideIcon} />
                        </div>
                        {item.title}
                      </div>
                      <div>
                        <div>
                          {" "}
                          {activeId === index.toString() ? (
                            <>
                              <BackDown className={styles.accordianIcon} />
                            </>
                          ) : (
                            <>
                              <Back className={styles.accordianIcon} />
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </Accordion.Toggle>
                  {item.subItems.length && item.subItems.map((subItem, subIndex) => (
                    <Accordion.Collapse
                      key={`${index}_${subIndex}`}
                      eventKey={index.toString()}
                    >
                      <div
                        className={
                          pagePath?.subItemPathPage === subItem.path
                            ? styles.accordianBodySelected
                            : styles.accordianBody
                        }
                      >
                        <Link to={subItem.path} className={styles.links}>
                          <Card.Body>{subItem.title}</Card.Body>
                        </Link>
                      </div>
                    </Accordion.Collapse>
                  ))}
                </div>
              ) : (
                <Link key={index} to={item.path} className={styles.links}>
                  <Card.Body
                    key={index}
                    className={`${
                      pagePath?.itemPathPage === item.path
                        ? styles.sidebarNavSelected
                        : styles.sidebarNav
                    }`}
                  >
                    <div className={styles.iconSet}>
                      <item.Icon className={styles.sideIcon} />
                    </div>
                    {item.title}
                  </Card.Body>
                </Link>
              );
            })}
          </Accordion>
          <Card.Body
            onClick={handleClickOpen}
            className={styles.sidebarNav}
          >
            <div className={styles.iconSet}>
              <SideLogout className={styles.sideIcon} />
            </div>
            Logout
          </Card.Body>
          <Card.Body
            className={`${styles.specialNav}`} 
          >
            <div className={styles.iconSet}>
            <img
                            className={styles.profile_img}
                                src="https://www.focusedu.org/wp-content/uploads/2018/12/circled-user-male-skin-type-1-2.png"
                                alt="card"
                                height={50}
                            />
            </div>
            <div className="d-flex flex-column">
            <div>{localStorage.getItem('email')?.split('@')[0]}</div>
            <div style={{color : 'white'}}>{JSON.parse(some).role}</div>
            </div>
           
          </Card.Body>
          <ModalComponent
          show={modalShow}
          modalInfo={modalInfo}
          onHideModal={hideModal}
          onHide={hideModal}
        />
        </div>
      </div>
    </>
  );
};

export default SideBar;
