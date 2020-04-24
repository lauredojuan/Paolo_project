import React, {useState} from 'react';
import {Column, Row, Divider} from '../../components/Sections'
import {useStaticQuery, graphql} from 'gatsby';
import {RoundImage, Colors} from '../Styling';
import {H2, H3, H4, Title, Paragraph} from '../Heading'
import Link from 'gatsby-link'
import {Card} from '../Card';

const WhoIsHiring = props => {
  const data = useStaticQuery(graphql`
      query myQueryWhoIsHiring{
        allPartnerYaml {
          edges {
            node {
              partners {
                tagline
                sub_heading
                footer_tagline
                footer_button
                footer_link
                images {
                  name
                  slug
                  image
                  featured
                }
              }
              influencers {
                sub_heading
                tagline
                images {
                  name
                  slug
                  image
                  featured
              }
            }
              financials {
                sub_heading
                tagline
                images {
                  name
                  slug
                  image
                  featured
              }
            }
              coding {
                sub_heading
                tagline
                images {
                  name
                  slug
                  image
                  featured
              }
            }
            }
          }
        }
        }
      `)
  const partners = props.lang[0].node
  console.log("partners", partners)
  return (
    <>
      {props.source === "partners"
        ?
        <>
          <Title
            title={partners.partners.tagline}
            primary
            size="8"
            paragraph={partners.partners.sub_heading}
            customParagraphSize="8"
          />
          <Divider height="100px" />
          <Row >
            {partners.partners.images.map((partner, index) => (
              <Column size="3" customRespSize respSize="3" key={index} margin="5px 0">
                <Card width="100%" padding="20px">
                  <RoundImage
                    h_xs="50px"
                    h_sm="70px"
                    h_md="80px"
                    h_lg="90px"
                    h_xl="80px"
                    width="100%"
                    url={partner.image}
                    border=".75rem"
                    bsize="contain"
                    position="center center"

                    backgroundColor="transparent"
                  />
                </Card>
              </Column>
            ))}
          </Row>
          <Divider height="50px" />
          <Row align="center">
            <H4 primary>{partners.partners.footer_tagline}</H4>
          </Row>
          <Row align="center" marginTop="15px">
            <Link to={partners.partners.footer_link}>
              <Paragraph color={Colors.blue}>{partners.partners.footer_button}</Paragraph>
            </Link>
          </Row>
        </>
        : props.source === "coding"
          ?
          <>
            <Title
              title={partners.coding.tagline}
              primary
              size="8"
              paragraph={partners.coding.sub_heading}
            />
            <Divider height="100px" />
            <Row>
              {partners.coding.images.map((partner, index) => (
                <Column size="3" customRespSize respSize="3" key={index} margin="5px 0">
                  <Card width="100%" padding="20px">
                    <RoundImage
                      h_xs="50px"
                      h_sm="50px"
                      h_md="80px"
                      h_lg="90px"
                      h_xl="80px"
                      width="100%"
                      url={partner.image}
                      border=".75rem"
                      bsize="contain"
                      position="center"
                      backgroundColor="transparent"
                    />
                  </Card>
                </Column>
              ))}
            </Row>
          </>
          : props.source === "influencers"
            ?
            <>
              <Title
                title={partners.influencers.tagline}
                primary
                size="8"
                paragraph={partners.influencers.sub_heading}
              />
              <Divider height="100px" />
              <Row>
                {partners.influencers.images.map((partner, index) => (
                  <Column size="3" customRespSize respSize="3" key={index} margin="5px 0">
                    <Card width="100%" padding="20px">
                      <RoundImage
                        h_xs="50px"
                        h_sm="50px"
                        h_md="80px"
                        h_lg="90px"
                        h_xl="80px"
                        width="100%"
                        url={partner.image}
                        border=".75rem"
                        bsize="contain"
                        position="center"
                        backgroundColor="transparent" />
                    </Card>
                  </Column>
                ))}
              </Row>
            </>
            : props.source === "financials" &&
            <>
              <Title
                title={partners.financials.tagline}
                primary
                size="8"
                paragraph={partners.financials.sub_heading}
              />
              <Divider height="100px" />
              <Row>
                {partners.financials.images.map((partner, index) => (
                  <Column size="4" customRespSize respSize="4" key={index} margin="5px 0">
                    <Card width="100%" padding="20px">
                      <RoundImage
                        h_xs="50px"
                        h_sm="50px"
                        h_md="80px"
                        h_lg="90px"
                        h_xl="40px"
                        width="100%"
                        url={partner.image}
                        border=".75rem"
                        bsize="contain"
                        position="center"
                        backgroundColor="transparent" />
                    </Card>
                  </Column>
                ))}
              </Row>
            </>
      }
    </>
  )
};

export default WhoIsHiring;
