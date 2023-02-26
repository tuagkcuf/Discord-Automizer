import axios from "axios";
import { useState } from "react";
import styled from "styled-components"
import Select from 'react-select'


const API_BASE = "http://localhost:3000";

const Binance = () => {
    const [data, setData] = useState("")
    const [tapped, setTapped] = useState({currency: "USDT", state: "Buy"})

    const currency = [{value: "USDT", label: "USDT"}, {value: "BUSD", label: "BUSD"}]
    const state = [{value: "Buy", label: "Buy"}, {value: "Sell", label: "Sell"}]

    const getData = async () => {
        const data = await axios.get(API_BASE + `/binance/monitor/${tapped.state.toLowerCase()}/${tapped.currency}`)

        setData(data)
    }

    return (
        <Binance__main>
            <Binance__main__heading>Binance</Binance__main__heading>
            <Binance__main__currency 
                defaultValue={tapped.currency} 
                options={currency} 
                onChange={(e) => setTapped({currency: e, state: tapped.state})}
                placeholder="Value"
            />
            <Binance__main__state 
                defaultValue={tapped.state}
                options={state} 
                onChange={(e) => setTapped({currency: tapped.currency, state: e})}
                placeholder="State"
            />
            <Binance__main__btnSubmit onClick={getData}>
                <Binance__main__btnSubmit__text>Start</Binance__main__btnSubmit__text>
            </Binance__main__btnSubmit>
            <Binance__main__table>
                <Binance__main__table__topChart>
                    <Binance__main__table__topChart__text order="0" width="40px">Name</Binance__main__table__topChart__text>
                    <Binance__main__table__topChart__text order="1" width="34px">Price</Binance__main__table__topChart__text>
                    <Binance__main__table__topChart__text order="2" width="53px">Amount</Binance__main__table__topChart__text>
                    <Binance__main__table__topChart__text order="3" width="34px">Limit</Binance__main__table__topChart__text>
                    <Binance__main__table__topChart__text order="4" width="59px">Payment</Binance__main__table__topChart__text>
                </Binance__main__table__topChart>
                <Binance__main__table__line />
                <Binance__main__table__rows>
                    {data 
                        ? data.map((user, index) => {
                            <Binance__main__table__rows__row key={index}>
                                <Binance__main__table__rows__row__text order="0">{user.name}</Binance__main__table__rows__row__text>
                                <Binance__main__table__rows__row__text order="1">{user.price}</Binance__main__table__rows__row__text>
                                <Binance__main__table__rows__row__text order="2">{user.amount}</Binance__main__table__rows__row__text>
                                <Binance__main__table__rows__row__text order="3">{user.limit}</Binance__main__table__rows__row__text>
                                <Binance__main__table__rows__row__text order="4">{user.payments}</Binance__main__table__rows__row__text>
                            </Binance__main__table__rows__row>
                        })
                        : <div className="no-user-data">no data</div>
                    }
                </Binance__main__table__rows>
            </Binance__main__table>
        </Binance__main>
    )
};

const Binance__main = styled.div`
    box-sizing: border-box;

    position: absolute;
    width: 75vw;
    height: 90vh;
    left: 390px;
    top: 60px;

    background: #FFFFFF;
    border: 1px solid #FFFFFF;
    box-shadow: 0px 27px 26px -5px rgba(0, 0, 0, 0.25), 2px 4px 64px -13px rgba(0, 0, 0, 0.07);
    border-radius: 100px;    
`

const Binance__main__heading = styled.div`
    position: absolute;
    width: 170px;
    height: 63px;
    left: 70px;
    top: 24px;

    font-family: 'Roboto Slab', serif;
    font-style: normal;
    font-weight: 400;
    font-size: 48px;
    line-height: 63px;
    text-transform: capitalize;

    color: #000000;    
`

const Binance__main__state = styled(Select)`
    position: absolute;
    width: 91px;
    height: 33px;
    left: 184px;
    top: 149px;

    background: #FFFFFF;
    box-shadow: 0px 2px 18px -11px rgba(255, 0, 0, 0.25), 4px 2px 8px 3px rgba(0, 0, 0, 0.25);
    border-radius: 20px;
`

const Binance__main__currency = styled(Select)`
    position: absolute;
    width: 91px;
    height: 33px;
    left: 79px;
    top: 182px;

    background: #FFFFFF;
    box-shadow: 0px 2px 18px -11px rgba(255, 0, 0, 0.25), 4px 2px 8px 3px rgba(0, 0, 0, 0.25);
    border-radius: 20px;
`

const Binance__main__btnSubmit = styled.div`
    position: absolute;
    width: 155.17px;
    height: 43px;
    left: 97px;
    top: 235px;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    background: rgba(255, 255, 255, 0.8);
    border: 1px solid rgba(181, 181, 181, 0.59);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 20px;
`

const Binance__main__btnSubmit__text = styled.div`
    font-family: 'Roboto', serif;
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    font-variant: all-small-caps;

    color: #000000;    
`

const Binance__main__table = styled.div`
    position: absolute;
    width: 858px;
    height: 490px;
    left: 70px;
    top: 301px;

    background: #FFFFFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 6px -1px 18px rgba(0, 0, 0, 0.25);
    border-radius: 60px;
`

const Binance__main__table__topChart = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 4px 24px;
    gap: 130px;

    position: absolute;
    width: 798px;
    height: 26px;
    left: 28px;
    top: 44px;
`

const Binance__main__table__topChart__text = styled.div`
    width: ${props => props.width};
    height: 18px;

    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 15px;
    line-height: 18px;
    /* identical to box height */

    text-transform: capitalize;

    color: rgba(0, 0, 0, 0.4);


    /* Inside auto layout */

    flex: none;
    order: ${props => props.order};
    flex-grow: 0;
` 

const Binance__main__table__line = styled.div`
    position: absolute;
    width: 774px;
    height: 0px;
    left: 38px;
    top: 76px;

    border: 1px solid rgba(0, 0, 0, 0.4);
`

const Binance__main__table__rows = styled.div`
    position: absolute;
    width: 800px;
    height: 373px;
    left: 33px;
    top: 82px;

    margin-top: 14px;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
`

const Binance__main__table__rows__row = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding-top: 4px;
    gap: 86px;

    position: relative;
    width: 782px;
    height: 27px;

    flex: none;
    order: ${props => props.order};
    flex-grow: 0
`

const Binance__main__table__rows__row__text = styled.div`
    width: fit-content;
    height: 19px;

    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    /* identical to box height */

    text-transform: capitalize;

    color: rgba(0, 0, 0, 0.7);


    /* Inside auto layout */

    flex: none;
    order: ${props => props.order};
    flex-grow: 0;
`

export default Binance;
