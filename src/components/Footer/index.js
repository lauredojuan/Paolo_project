import React from 'react';
import {Link} from 'gatsby';
import {Container, Row, Column, Divider} from '../Sections'
import {Colors, RoundImage} from '../Styling'
import {H5, Separator, Paragraph} from '../Heading'

const Footer = (props) => {
    let col = props;
    // let col = data.allFooterYaml.edges;
    return (
        <>
            <Container width="fluid" height="auto" color={Colors.black} p_top="25px" p_bottom="15px">
                <Divider height="20%" />
                <Row height="60%">
                    <Column size="2"></Column>
                    <Column size="8">

                        <Row align="center">
                            {col.lang[0].node.footer.map((item, index) => {

                                return (
                                    <Column key={index} size="2" margin={item.heading === "COMPANY" || item.heading === "COMPAÑÍA" ? "0" : "0 0 20px 0"}>
                                        {item.heading === null
                                            ? <Row height="20px" display_xs="none" display_sm="none"><H5 fontSize="16px" color={Colors.gray}>{item.heading}</H5></Row>
                                            : <Row height="20px"><H5 fontSize="16px" color={Colors.gray}>{item.heading}</H5></Row>}
                                        {item.heading != null
                                            ? item.heading === "COMPANY" || item.heading === "COMPAÑÍA"
                                                ? <Row height="20px" marginBottom="10px"><Separator margin=".5rem 0" width="100%" primary></Separator></Row>
                                                : <Row height="20px" marginBottom="10px" ><Separator margin=".5rem 0" primary></Separator></Row>
                                            : <Row height="20px" marginBottom="10px" display_xs="none" display_sm="none"><Separator margin=".5rem 0" primary></Separator></Row>
                                        }
                                        {item.items.map((items) => {
                                            return (
                                                <>

                                                    {item.heading === 'FOLLOW' || item.heading === 'SÍGUENOS' ?
                                                        <a href={items.link} key={item.name}>
                                                            <Row marginBottom="5px">
                                                                <Paragraph
                                                                    fs_xs="16px"
                                                                    fs_sm="16px"
                                                                    fs_md="12px"
                                                                    fs_lg="14px"
                                                                    fs_xl="16px"
                                                                    color={Colors.white}
                                                                >
                                                                    {items.name}
                                                                </Paragraph>
                                                            </Row>
                                                        </a>
                                                        :
                                                        <Link to={items.link} key={item.name}>
                                                            <Row marginBottom="5px">
                                                                <Paragraph
                                                                    fs_xs="16px"
                                                                    fs_sm="16px"
                                                                    fs_md="12px"
                                                                    fs_lg="14px"
                                                                    fs_xl="16px"
                                                                    color={Colors.white}
                                                                >
                                                                    {items.name}
                                                                </Paragraph>
                                                            </Row>
                                                        </Link>}
                                                </>
                                            )
                                        })}
                                    </Column>
                                )
                            })}
                        </Row>
                    </Column>
                </Row>
                <Row height="20%">
                    <Column size="2"></Column>
                    <Column size="8">
                        <Row align="center">
                            <Column size="9" margin="5px 0" customRespSize respSize="6">
                                <Paragraph fontSize="12px" color={Colors.gray}>@ 4Geeks Academy LLC 2019 </Paragraph>
                            </Column>
                            <Column size="3" margin="5px 0" customRespSize respSize="6">
                                <Row>
                                    <Column size="6" customRespSize respSize="6">
                                        <RoundImage url="/images/bitcoin.png" height="12px" backgroundColor="transparent" position="center" bsize="contain" />
                                    </Column>
                                    <Column size="6" customRespSize respSize="6">
                                        <RoundImage url="/images/ethereum.png" height="14px" backgroundColor="transparent" position="center" bsize="contain" />
                                    </Column>
                                </Row>
                            </Column>
                        </Row>
                    </Column>
                </Row>
            </Container>
        </>
    )
};

export default Footer;

