import axios from "axios";
import styled from "styled-components";
import Select from "react-select";
import { useState, useEffect } from "react";

const API_BASE = "http://localhost:3000";

const ServersCleaner = () => {
    const [profiles, setProfiles] = useState([]);
    const [tapped, setTapped] = useState([]);

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

    const cleaner = async () => {
        const data = await axios.post(API_BASE + "/cleaner", {
            accounts: tapped.map((tap) => tap._id),
        });

        if (data) console.log("servers are cleaned");
        else console.log("there was an error");
    };

    return (
        <Cleaner__main>
            <Cleaner__heading>Cleaner</Cleaner__heading>
            <Cleaner__main__accountsSelect
                placeholder="Accounts"
                value={tapped}
                options={profiles}
                onChange={(e) => setTapped(...tapped, e.value)}
            />
            <Cleaner__main__ProfilesData>
                {profiles.length > 0 ? (
                    profiles.map((profile, index) => {
                        return (
                            <Cleaner__main__ProfilesData__element key={index}>
                                <Cleaner__main__ProfilesData__element__text>
                                    {profile.name}
                                </Cleaner__main__ProfilesData__element__text>
                                <Cleaner__main__ProfilesData__element__button
                                    onClick={(e) =>
                                        setTapped(
                                            tapped.filter(
                                                (elem) =>
                                                    elem !== e.target.value
                                            )
                                        )
                                    }
                                >
                                    X
                                </Cleaner__main__ProfilesData__element__button>
                            </Cleaner__main__ProfilesData__element>
                        );
                    })
                ) : (
                    <div>There is no one profile available</div>
                )}
            </Cleaner__main__ProfilesData>
            <Cleaner__main__btnStart onClick={cleaner}>
                <Cleaner__main__btnStart__text>
                    Start
                </Cleaner__main__btnStart__text>
            </Cleaner__main__btnStart>
        </Cleaner__main>
    );
};

const Cleaner__main = styled.div`
    box-sizing: border-box;

    position: absolute;
    width: 75vw;
    height: 90vh;
    left: 390px;
    top: 60px;

    background: #ffffff;
    border: 1px solid #ffffff;
    box-shadow: 0px 27px 26px -5px rgba(0, 0, 0, 0.25),
        2px 4px 64px -13px rgba(0, 0, 0, 0.07);
    border-radius: 100px;
`;

const Cleaner__heading = styled.div`
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

const Cleaner__main__accountsSelect = styled(Select)`
    position: absolute;
    width: 190px;
    height: 53px;
    left: 66px;
    top: 165px;

    background: #ffffff;
    box-shadow: 0px 2px 18px -11px rgba(255, 0, 0, 0.25),
        4px 2px 8px 3px rgba(0, 0, 0, 0.25);
    border-radius: 20px;

    &.p-multiselect {
        border-radius: 20px;
        font-family: "Roboto", serif;
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;

        color: rgba(0, 0, 0, 0.6);
    }

    &.p-multiselect-label-container {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }
`;

const Cleaner__main__ProfilesData = styled.div`
    position: absolute;
    width: 338px;
    height: 377px;
    left: 64px;
    top: 238px;

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

const Cleaner__main__ProfilesData__element = styled.div`
    position: relative;
    width: 278px;
    height: 35px;

    background: white;
    border: 1px solid rgba(0, 0, 0, 0.5);
    border-radius: 10px;
`;
const Cleaner__main__ProfilesData__element__text = styled.div`
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

const Cleaner__main__ProfilesData__element__button = styled.div`
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

const Cleaner__main__btnStart = styled.div`
    position: absolute;
    width: 155.17px;
    height: 43px;
    left: 154px;
    top: 633px;

    background: rgba(255, 255, 255, 0.8);
    border: 1px solid rgba(181, 181, 181, 0.59);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 20px;

    display: flex;
    align-items: center;
    justify-content: center;
`;

const Cleaner__main__btnStart__text = styled.div`
    font-family: "Roboto", serif;
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    font-variant: all-small-caps;

    color: #000000;
`;

export default ServersCleaner;
