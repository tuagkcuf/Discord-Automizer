import axios from "axios";
import styled from "styled-components";
import { useState, useEffect } from "react";
import ReactLogo from "./1.svg";
import ReactLogo2 from "./2.svg";

const API_BASE = "http://localhost:3000";

const Profiles = () => {
    const [profiles, setProfiles] = useState([]);
    const [token, setToken] = useState("");
    const [newProfile, setNewProfile] = useState({ login: "", password: "" });
    const [failPopup, setFailPopup] = useState(false);

    useEffect(() => {
        getProfiles();
    }, []);

    const getProfiles = () => {
        axios
            .get(API_BASE + "/creators")
            .then((data) =>
                data
                    ? data.data.map((data) => setProfiles([...profiles, data]))
                    : false
            )
            .catch((err) => console.error(err));
    };

    const addProfile = async () => {
        const data = await axios.post(API_BASE + "/creators/new/password", {
            login: newProfile.login,
            password: newProfile.password,
        });

        setNewProfile({ login: "", password: "" });

        if (data) {
            setProfiles([...profiles, data.data]);
            console.log("profiles have set");
        } else {
            setFailPopup(true);
        }
    };

    const addProfileWithToken = async () => {
        const data = await axios.post(API_BASE + "/creators/new/token", {
            token: token,
        });

        setToken("");

        if (data) {
            setProfiles([...profiles, data.data]);
            console.log("profiles have set");
        } else {
            setFailPopup(true);
        }
    };

    const deleteProfile = async (id) => {
        const data = await axios
            .post(API_BASE + "/creators/delete" + id)
            .then((res) => res.json());

        setProfiles((profiles) =>
            profiles.filter((profile) => profile._id !== data.result._id)
        );
    };

    return (
        <ProfilesMain>
            <ProfilesHeading>Profiles</ProfilesHeading>
            <LoginWithPassword>
                <LoginWithPasswordHeading>
                    with password
                </LoginWithPasswordHeading>
                <LoginWithPassword__block>
                    <LoginWithPassword__block__nickname>
                        <LoginWithPassword__block__nickname__text>
                            nickname
                        </LoginWithPassword__block__nickname__text>
                        <LoginWithPassword__block__nickname__input
                            type="text"
                            onChange={(e) =>
                                setNewProfile({
                                    login: e.target.value,
                                    password: newProfile.password,
                                })
                            }
                            value={newProfile.login}
                        />
                    </LoginWithPassword__block__nickname>
                    <LoginWithPassword__block__password>
                        <LoginWithPassword__block__password__text>
                            password
                        </LoginWithPassword__block__password__text>
                        <LoginWithPassword__block__password__input
                            type="text"
                            onChange={(e) =>
                                setNewProfile({
                                    login: newProfile.login,
                                    password: e.target.value,
                                })
                            }
                            value={newProfile.password}
                        />
                    </LoginWithPassword__block__password>
                    <LoginWithPassword__block__button onClick={addProfile}>
                        <LoginWithPassword__block__button__text>
                            start
                        </LoginWithPassword__block__button__text>
                    </LoginWithPassword__block__button>
                </LoginWithPassword__block>
            </LoginWithPassword>
            <LoginWithToken>
                <LoginWithPasswordHeading>with token</LoginWithPasswordHeading>
                <LoginWithToken__block>
                    <LoginWithToken__block__token>
                        <LoginWithToken__block__token__text>
                            token
                        </LoginWithToken__block__token__text>
                        <LoginWithToken__block__token__input
                            type="text"
                            value={token}
                            onChange={(e) => setToken(e.target.value)}
                        />
                    </LoginWithToken__block__token>
                    <LoginWithToken__block__button
                        onClick={addProfileWithToken}
                    >
                        <LoginWithToken__block__button__text>
                            start
                        </LoginWithToken__block__button__text>
                    </LoginWithToken__block__button>
                </LoginWithToken__block>
            </LoginWithToken>
            <ProfilesData>
                {profiles.length > 0 ? (
                    profiles.map((profile, index) => {
                        return (
                            <ProfilesData__element key={index}>
                                <ProfilesData__element__text>
                                    {profile.name}
                                </ProfilesData__element__text>
                                <ProfilesData__element__button
                                    onClick={() => deleteProfile(profile._id)}
                                >
                                    X
                                </ProfilesData__element__button>
                            </ProfilesData__element>
                        );
                    })
                ) : (
                    <div>There is no one profile available</div>
                )}
            </ProfilesData>
            {failPopup ? (
                <div className="fail-popup">
                    <div
                        className="close"
                        onClick={() => setFailPopup(false)}
                    ></div>
                    <div className="content">
                        <h3>Account adding fail</h3>
                        <p>Username or password is not valid</p>
                    </div>
                </div>
            ) : (
                ""
            )}
            <Design1 src={ReactLogo} />
            <Design2 src={ReactLogo2} />
        </ProfilesMain>
    );
};

const ProfilesHeading = styled.div`
    position: absolute;
    width: 170px;
    height: 63px;
    left: 70px;
    top: 24px;

    font-family: "Roboto Slab", serif;
    font-style: normal;
    font-weight: 400;
    font-size: 48px;
    line-height: 63px;
    text-transform: capitalize;

    color: #000000;
`;

const ProfilesMain = styled.div`
    box-sizing: border-box;

    position: absolute;
    width: 75vw;
    height: 90vh;
    left: 390px;
    top: 60px;

    background: #ffffff;
    box-shadow: 0px 27px 26px -5px rgba(0, 0, 0, 0.25),
        2px 4px 64px -13px rgba(0, 0, 0, 0.07);
    border-radius: 100px;
`;

const LoginWithPassword = styled.div`
    position: absolute;
    width: 250px;
    height: 291px;
    left: 55px;
    top: 163px;

    display: flex;
    flex-direction: column;
    align-items: center;
`;

const LoginWithPasswordHeading = styled.div`
    position: relative;
    width: 100%;
    height: 28px;

    margin-bottom: 1vh;
    text-align: center;

    font-family: "Robot", sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 28px;
    font-variant: all-small-caps;

    color: black;
`;

const LoginWithPassword__block = styled.div`
    position: relative;
    width: 226px;
    height: 237px;

    display: flex;
    flex-direction: column;
    align-items: center;
    align-content: center;
    justify-content: center;
    gap: 20px;

    background: #ffffff;
    box-shadow: 0px 2px 18px -11px rgba(255, 0, 0, 0.25),
        4px 2px 8px 3px rgba(0, 0, 0, 0.25);
    border-radius: 70px;
`;

const LoginWithPassword__block__nickname = styled.div`
    position: relative;
    width: 151px;
    height: 51px;
`;

const LoginWithPassword__block__nickname__text = styled.div`
    font-family: "Roboto", sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    text-transform: lowercase;

    margin-left: 1vw;

    color: rgba(0, 0, 0, 0.8);
`;

const LoginWithPassword__block__nickname__input = styled.input`
    height: 37px;

    background: #ffffff;
    border: 2px solid rgba(181, 181, 181, 0.59);
    border-radius: 20px;

    text-indent: 10px;
`;

const LoginWithPassword__block__password = styled.div`
    position: relative;
    width: 151px;
    height: 51px;
`;

const LoginWithPassword__block__password__text = styled.div`
    font-family: "Roboto", sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    text-transform: lowercase;

    margin-left: 1vw;

    color: rgba(0, 0, 0, 0.8);
`;

const LoginWithPassword__block__password__input = styled.input`
    height: 37px;

    background: #ffffff;
    border: 2px solid rgba(181, 181, 181, 0.59);
    border-radius: 20px;

    text-indent: 10px;
`;

const LoginWithPassword__block__button = styled.div`
    position: relative;
    width: 83px;
    height: 23px;

    box-sizing: border-box;

    background: rgba(255, 255, 255, 0.8);
    border: 1px solid rgba(181, 181, 181, 0.59);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 20px;

    display: flex;
    justify-content: center;
    align-items: center;
`;

const LoginWithPassword__block__button__text = styled.div`
    font-family: "Roboto";
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;

    text-transform: lowercase;

    color: #000000;
`;

const LoginWithToken = styled.div`
    position: absolute;
    width: 250px;
    height: 291px;
    left: 55px;
    top: 514px;

    display: flex;
    flex-direction: column;
    align-items: center;
`;

const LoginWithToken__block = styled.div`
    position: relative;
    width: 226px;
    height: 167px;

    display: flex;
    flex-direction: column;
    align-items: center;
    align-content: center;
    justify-content: center;
    gap: 20px;

    background: #ffffff;
    box-shadow: 0px 2px 18px -11px rgba(255, 0, 0, 0.25),
        4px 2px 8px 3px rgba(0, 0, 0, 0.25);
    border-radius: 60px;
`;

const LoginWithToken__block__token = styled.div`
    position: relative;
    width: 151px;
    height: 51px;
`;

const LoginWithToken__block__token__text = styled.div`
    font-family: "Roboto", sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    text-transform: lowercase;

    margin-left: 1vw;

    color: rgba(0, 0, 0, 0.8);
`;

const LoginWithToken__block__token__input = styled.input`
    height: 37px;

    background: #ffffff;
    border: 2px solid rgba(181, 181, 181, 0.59);
    border-radius: 20px;

    text-indent: 10px;
`;

const LoginWithToken__block__button = styled.div`
    position: relative;
    width: 83px;
    height: 23px;

    box-sizing: border-box;

    background: rgba(255, 255, 255, 0.8);
    border: 1px solid rgba(181, 181, 181, 0.59);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 20px;

    display: flex;
    justify-content: center;
    align-items: center;
`;

const LoginWithToken__block__button__text = styled.div`
    font-family: "Roboto";
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;

    text-transform: lowercase;

    color: #000000;
`;

const ProfilesData = styled.div`
    position: absolute;
    width: 342px;
    height: 550px;
    left: 571px;
    top: 192px;

    display: flex;
    flex-direction: column;
    gap: 10px;
    justify-content: flex-start;
    align-items: center;

    box-sizing: border-box;

    padding-top: 3vh;

    background: #ffffff;

    border: 1px solid rgba(181, 181, 181, 0.59);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 60px;
`;

const ProfilesData__element = styled.div`
    position: relative;
    width: 278px;
    height: 35px;

    background: white;
    border: 1px solid rgba(0, 0, 0, 0.5);
    border-radius: 10px;
`;

const ProfilesData__element__text = styled.div`
    position: relative;
    width: 110px;
    height: 14px;
    left: 17px;
    top: 11px;

    font-family: "Roboto", sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;

    color: #000000;
`;

const ProfilesData__element__button = styled.div`
    position: absolute;
    width: 13px;
    height: 13px;

    top: 5px;
    right: 13px;

    font-size: 15px;

    transition: 0.5s;

    &:hover {
        transform: scale(150%);
    }
`;

const Design1 = styled.img`
    position: absolute;
    width: 228.27px;
    height: 28.03px;
    left: 48.34px;
    top: 81.07px;
`;

const Design2 = styled.img`
    position: absolute;
    width: 285.25px;
    height: 76.26px;
    left: 48.08px;
    top: 412.44px;
`;

export default Profiles;
