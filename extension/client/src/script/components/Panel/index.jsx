import "./index.css"
import styled from "styled-components"
import { NavLink } from "react-router-dom"

const PanelDiv = styled.div`
    position: absolute;
    width: 304px;
    height: 902px;
    left: 61px;
    top: 60px;
`

const Logo = styled.div`
    position: absolute;
    width: 54px;
    height: 76px;
    left: 43px;
    top: 45px;
    
    background-color: aliceblue;
`

const Background = styled.div`
    box-sizing: border-box;

    position: absolute;
    width: 305px;
    height: 90vh;
    left: -1px;
    top: 2px;

    background: radial-gradient(50% 50% at 50% 50%, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%);
    box-shadow: 0px 27px 26px -5px rgba(0, 0, 0, 0.25), 2px 4px 64px -13px rgba(0, 0, 0, 0.07);
    border-radius: 100px;
`

const Discord = styled.div`
    position: absolute;
    width: 118px;
    height: 240px;
    left: 38px;
    top: 167px;
`

const DiscordName = styled.div`
    font-family: 'Roboto Slab', serif;
    font-style: normal;
    font-weight: 400;
    font-size: 32px;
    line-height: 42px;
    text-transform: capitalize;

    color: black;
`

const Line = styled.div`
    position: absolute;
    width: 111px;
    height: 0px;
    left: 3px;
    top: 53.5px;

    border: 2px solid black;
`

const DiscordPages = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 1px 3px;
    gap: 17px; 

    position: absolute;
    width: 121px;
    height: 193px;
    left: 2px;
    top: 76px;
`

const DiscordElement = styled.div`
    width: 120px;
    height: 35px;

    flex: none;
    order: ${props => props.order};
    flex-grow: 0;

    text-align: center;

    transition: 1s;

    &:hover {
        background: #FFFFFF;
        box-shadow: 0px 4px 18px rgba(0, 0, 0, 0.25), 1px 0px 4px rgba(0, 0, 0, 0.25);
        border-radius: 20px;
    }
`

const Text = styled(NavLink)`
    font-family: sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 28px;
    font-variant: all-small-caps;

    color: black;
`

const Monitors = styled.div`
    position: absolute;
    width: 118px;
    height: 116px;
    left: 38px;
    top: 594px;
`

const MonitorsName = styled.div`
    font-family: 'Roboto Slab';
    font-style: normal;
    font-weight: 400;
    font-size: 32px;
    line-height: 42px;
    text-transform: capitalize;

    color: #000000;    
`

const MonitorsPages = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 1px 3px;
    gap: 17px;

    position: absolute;
    width: 121px;
    height: 37px;
    left: 2px;
    top: 76px;
`

const MonitorElement = styled.div`
    width: 115px;
    height: 35px;

    text-align: center;

    transition: 1s;

    flex: none;
    order: 0;
    flex-grow: 0;

    &:hover {
        background: #FFFFFF;
        box-shadow: 0px 4px 18px rgba(0, 0, 0, 0.25), 1px 0px 4px rgba(0, 0, 0, 0.25);
        border-radius: 20px;
    }
`

const Panel = () => {
    return (
        <PanelDiv>
            <Logo />
            <Background />
            <Discord>
                <DiscordName>discord</DiscordName>
                <Line />
                <DiscordPages>
                    <DiscordElement order="0">
                        <Text
                            to='/discord-tools/profiles'
                            className="text"
                        >
                            Profiles
                        </Text>
                    </DiscordElement>  
                    <DiscordElement order="1">
                        <Text
                            className='links'
                            to='/discord-tools/spammer'
                        >
                            Spammer
                        </Text>
                    </DiscordElement>
                    <DiscordElement order="2">
                        <Text
                            className='links'
                            to='/discord-tools/joiner'
                        >
                            Joiner
                        </Text>
                    </DiscordElement>
                    <DiscordElement order="3">
                        <Text
                            className='links'
                            to='/discord-tools/servers-cleaner'
                        >
                            Cleaner
                        </Text>
                    </DiscordElement>  
                </DiscordPages>
            </Discord>
            <Monitors>
                <Line />
                <MonitorsName>Monitors</MonitorsName>
                <MonitorsPages>          
                    <MonitorElement>               
                        <Text
                            className='links'
                            to='/monitors/binance'
                        >
                            Binance
                        </Text>
                    </MonitorElement>
                </MonitorsPages>  
            </Monitors>
        </PanelDiv>
    );
};

export default Panel;
