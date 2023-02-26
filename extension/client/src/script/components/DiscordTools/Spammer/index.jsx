import axios from "axios";
import { useState, useEffect } from "react";
import Select from "react-select";
import styled from "styled-components";

const API_BASE = "http://localhost:3000";

const Spammer = () => {
    const [profiles, setProfiles] = useState([]);
    const [tapped, setTapped] = useState([]);
    const [messages, setMessages] = useState(["Hello"]);
    const [link, setLink] = useState("");

    let delayMax = 0,
        delayMin = 0;

    useEffect(() => {
        getProfiles();
    }, []);

    const inputValueChange = async (index, event) => {
        let data = [...messages];
        data[index] = event.target.value;
        setMessages(data);
    };

    const addInputMessages = async () => {
        setMessages([...messages, ""]);
    };

    const getProfiles = async (event) => {
        // event.preventDefault()
        await axios
            .get(API_BASE + "/creators")
            .then((data) =>
                data
                    ? data.data.map((data) => setProfiles([...profiles, data]))
                    : false
            )
            .catch((err) => console.error(err));
    };

    const spammerProfiles = async (
        event,
        messages,
        tapped,
        link,
        delayMin,
        delayMax
    ) => {
        event.preventDefault();
        setTooltipText("proceed");
        const data = await axios.post(API_BASE + "/spammer", {
            messages: messages,
            accounts: tapped.map((tap) => tap._id),
            delayMax: delayMax,
            delayMin: delayMin,
            link: link,
        });

        if (data) {
            console.log("shablon created");
        } else {
            console.log("it was an error");
        }
    };

    return (
        <Spammer__main>
            <Spammer__main__heading>spammer</Spammer__main__heading>
            <Spammer__main__inputLink
                type="text"
                onChange={(e) => setLink(e.target.value)}
                placeholder="Type link here"
                required
            />
            <Spammer__main__minDelay
                type="number"
                onChange={(e) => (delayMin = e.target.value)}
                placeholder="Type min delay here"
                required
            />
            <Spammer__main__maxDelay
                type="number"
                onChange={(e) => (delayMax = e.target.value)}
                placeholder="Type max delay here"
                required
            />
            <Spammer__main__accountsSelect
                isMulti
                value={tapped}
                options={profiles}
                onChange={(e) => setTapped(...tapped, e.value)}
                placeholder="Accounts"
            />
            <Spammer__main__ProfilesData>
                <Spammer__main__ProfilesData__element>
                    <Spammer__main__ProfilesData__element__text>
                        dfgdfhdfhdh
                    </Spammer__main__ProfilesData__element__text>
                    <Spammer__main__ProfilesData__element__button />
                </Spammer__main__ProfilesData__element>
            </Spammer__main__ProfilesData>
            <Spammer__main__btnStart
                onClick={(event) =>
                    spammerProfiles(
                        event,
                        messages,
                        tapped,
                        link,
                        delayMin,
                        delayMax
                    )
                }
            >
                <Spammer__main__btnStart__text>
                    start
                </Spammer__main__btnStart__text>
            </Spammer__main__btnStart>
            <Spammer__main__message>
                <Spammer__main__message__text>
                    Messages
                </Spammer__main__message__text>
                {messages.map((message, index) => {
                    return (
                        <Spammer__main__message__inputBlock>
                            <Spammer__main__message__input
                                placeholder="Message"
                                type="text"
                                key={index}
                                value={message}
                                onChange={(event) =>
                                    inputValueChange(index, event)
                                }
                            ></Spammer__main__message__input>
                            <Spammer__main__message__input__button>
                                x
                            </Spammer__main__message__input__button>
                        </Spammer__main__message__inputBlock>
                    );
                })}
            </Spammer__main__message>
            <Spammer__main__btnAdd onClick={addInputMessages}>
                <Spammer__main__btnAdd__text>
                    Add message
                </Spammer__main__btnAdd__text>
            </Spammer__main__btnAdd>
        </Spammer__main>
    );
};

const Spammer__main = styled.div`
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

const Spammer__main__heading = styled.div`
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

const Spammer__main__inputLink = styled.input`
    position: absolute;
    width: 193px;
    height: 56px;
    left: 70px;
    top: 171px;

    background: #ffffff;
    box-shadow: 0px 2px 18px -11px rgba(255, 0, 0, 0.25),
        4px 2px 8px 3px rgba(0, 0, 0, 0.25);
    border-radius: 20px;

    text-indent: 10px;

    &::placeholder {
        font-family: "Roboto", serif;
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;
        color: rgba(0, 0, 0, 0.6);
    }
`;

const Spammer__main__minDelay = styled.input`
    position: absolute;
    width: 195px;
    height: 56px;
    left: 68px;
    top: 245px;

    text-indent: 10px;

    background: #ffffff;
    box-shadow: 0px 2px 18px -11px rgba(255, 0, 0, 0.25),
        4px 2px 8px 3px rgba(0, 0, 0, 0.25);
    border-radius: 20px;

    &::placeholder {
        font-family: "Roboto";
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;
        color: rgba(0, 0, 0, 0.6);
    }
`;

const Spammer__main__maxDelay = styled.input`
    position: absolute;
    width: 195px;
    height: 56px;
    left: 281px;
    top: 245px;

    text-indent: 10px;

    background: #ffffff;
    box-shadow: 0px 2px 18px -11px rgba(255, 0, 0, 0.25),
        4px 2px 8px 3px rgba(0, 0, 0, 0.25);
    border-radius: 20px;

    &::placeholder {
        font-family: "Roboto", serif;
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;

        color: rgba(0, 0, 0, 0.6);
    }
`;

const Spammer__main__accountsSelect = styled(Select)`
    position: absolute;
    width: 195px;
    height: 56px;
    left: 66px;
    top: 315px;

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
        margin-top: 6px;

        color: rgba(0, 0, 0, 0.6);
    }

    &.p-multiselect-label-container {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }
`;

const Spammer__main__ProfilesData = styled.div`
    position: absolute;
    width: 342px;
    height: 376px;
    left: 62px;
    top: 397px;

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

const Spammer__main__ProfilesData__element = styled.div`
    position: relative;
    width: 278px;
    height: 35px;

    background: white;
    border: 1px solid rgba(0, 0, 0, 0.5);
    border-radius: 10px;
`;

const Spammer__main__ProfilesData__element__text = styled.div`
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

const Spammer__main__ProfilesData__element__button = styled.div`
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

const Spammer__main__btnStart = styled.div`
    position: absolute;
    width: 155.17px;
    height: 43px;
    left: 157px;
    top: 785px;

    background: rgba(255, 255, 255, 0.8);
    border: 1px solid rgba(181, 181, 181, 0.59);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 20px;

    display: flex;
    align-items: center;
    justify-content: center;
`;

const Spammer__main__btnStart__text = styled.div`
    font-family: "Roboto", serif;
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    font-variant: all-small-caps;

    color: #000000;
`;

const Spammer__main__btnAdd = styled.div`
    position: absolute;
    width: 155.17px;
    height: 43px;
    left: 701px;
    top: 785px;

    background: rgba(255, 255, 255, 0.8);
    border: 1px solid rgba(181, 181, 181, 0.59);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 20px;

    display: flex;
    align-items: center;
    justify-content: center;
`;

const Spammer__main__btnAdd__text = styled.div`
    font-family: "Roboto", serif;
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    font-variant: all-small-caps;

    color: #000000;
`;

const Spammer__main__message = styled.div`
    position: absolute;
    width: 342px;
    height: 585px;
    left: 606px;
    top: 191px;

    background: #ffffff;

    border: 1px solid rgba(181, 181, 181, 0.59);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 60px;
`;
const Spammer__main__message__text = styled.div`
    position: absolute;
    width: 106px;
    height: 28px;
    left: 118px;
    top: -40px;

    /* p */

    font-family: "Robot", sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 28px;
    font-variant: all-small-caps;

    color: #000000;
`;

const Spammer__main__message__inputBlock = styled.div`
    position: relative;
    width: 278px;
    height: 35px;
    left: 34px;
    top: 45px;

    display: flex;
    flex-direction: row;
    align-items: center;
`;

// TODO: MAKE RELATIVE
const Spammer__main__message__input = styled.input`
    position: relative;
    width: 258px;
    height: 35px;

    background: #ffffff;
    border: 1px solid rgba(0, 0, 0, 0.5);
    border-radius: 10px;

    text-indent: 10px;

    &::placeholder {
        font-family: "Roboto", serif;
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 14px;

        color: rgba(0, 0, 0, 0.6);
    }
`;

const Spammer__main__message__input__button = styled.div`
    position: relative;
    font-size: 15px;
    padding-left: 5px;
    transition: 0.5s;

    text-align: center;

    &:hover {
        transform: scale(150%);
    }
`;

export default Spammer;
