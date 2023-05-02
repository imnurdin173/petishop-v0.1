import React from "react";
import { Navbar, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, NavbarBrand, NavbarText, DropdownMenu, DropdownItem } from 'reactstrap';
import "../assets/styles/style.css";
import * as Icon from "react-bootstrap-icons";
// import Button from 'react-bootstrap/Button';
import { Form, InputGroup, Button, Dropdown } from 'react-bootstrap';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../redux/action/user";

class MyNavbar extends React.Component {
    render() {
        return (
            <div>
                <Navbar container className="py-2">
                    <Nav className="col-2">
                        <NavbarBrand className=""><Link to="/"><NavbarText>PETISHOP</NavbarText></Link></NavbarBrand>
                    </Nav>
                    <Nav>
                        <NavItem className="col-1">
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    Kategori
                                </DropdownToggle>
                                <DropdownMenu end>
                                    <DropdownItem>
                                        Kategori1
                                    </DropdownItem>
                                    <DropdownItem>
                                        Kategori2
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </NavItem>
                    </Nav>
                    <Nav
                        className="col-5 my-2 my-lg-0"
                    >
                        <NavItem className="" style={{ width: "100%" }}>
                            <Form>
                                <InputGroup>
                                    <Form.Control placeholder="Searching products here" />
                                    <Button id="SearchProductbtn" style={{ background: "rgba(0,0,0,0)", borderColor: "#fff", boxShadow: "none" }}>
                                        Cari
                                    </Button>
                                </InputGroup>
                            </Form>
                        </NavItem>
                    </Nav>
                    <Nav className="col mx-0">
                        <NavItem className="">
                            <NavLink>
                                <Icon.Cart style={{ width: "2em", height: "2em" }} />
                            </NavLink>
                        </NavItem>
                    </Nav>
                    {
                        this.props.userGlobal.email ?
                            <Nav>
                                {
                                    this.props.userGlobal.role === "Admin" ?
                                        <NavItem><NavLink href="">My Admin</NavLink></NavItem>
                                        : null
                                }
                                <NavItem>
                                    <UncontrolledDropdown nav inNavbar>
                                        <DropdownToggle nav caret>
                                            {this.props.userGlobal.nama}
                                        </DropdownToggle>
                                        <DropdownMenu end>
                                            <DropdownItem>
                                                Pesanan
                                            </DropdownItem>
                                            <DropdownItem>
                                                Wishlist
                                            </DropdownItem>
                                            <DropdownItem>
                                                Histori
                                            </DropdownItem>
                                            <Dropdown.Divider />
                                            <DropdownItem>
                                                Pengaturan Akun
                                            </DropdownItem>
                                            <DropdownItem onClick={this.props.logoutUser}>
                                                Keluar
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </NavItem>
                            </Nav>
                            : <Nav>
                                <NavItem>
                                    <Link to="/login"><button className="btn btn-light mt-2">Login</button></Link>
                                </NavItem>
                            </Nav>
                    }

                </Navbar>
            </div >
        );
    }
}

const mapStatetoProps = (state) => {
    return {
        userGlobal: state.user
    }
}

const mapDispatchtoProps = {
    logoutUser
}

export default connect(mapStatetoProps, mapDispatchtoProps)(MyNavbar);
