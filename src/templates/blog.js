import React, {useState} from 'react'
import Link from 'gatsby-link'
import {H1, H2, H3, H4, Title, Separator, Paragraph, Span} from '../components/Heading'
import {Container, Row, Column, Divider, Wrapper} from '../components/Sections'
import {RoundImage, Colors, Check, ArrowRight} from '../components/Styling'
import BaseRender from './_baseRender'


const Blog = ({data, pageContext, yml}) => {
    function GetFormattedDate (date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }

    return (

        <>
            <Wrapper
                style="default"

                border="bottom"
            >
                <Divider height="50px" />
                <Title
                    title={yml.banner.tagline}
                    main
                    size="8"
                    color={Colors.black}
                    paragraph={yml.banner.sub_heading}
                    paragraphColor={Colors.white}

                />
            </Wrapper>
            <Divider height="50px" />

            <Wrapper style="default">
                <Row align="left">
                    <Column size="12">
                        <H4

                            fs_xs="30px"
                            fs_sm="30px"
                            fs_md="30px"
                            fs_lg="30px"
                            fs_xl="30px"
                        >Featured</H4>
                    </Column>
                </Row>
                <Row>
                    <Separator primary />
                </Row>
                <Divider height="50px" />
                <Row>
                    <div className="card-columns">
                        {data.posts.edges.filter(post => post.node.frontmatter.featured === true).map((item, i) => {
                            console.log("item", data)

                            return (
                                <Column size="12" masonry key={i} height="auto" margin="0 0 40px 0">
                                    {item.node.frontmatter.image != null ?
                                        <Link to={`/post/${item.node.frontmatter.slug}`}><RoundImage
                                            url={item.node.frontmatter.image}
                                            bsize="cover"
                                            mb="10px"
                                            border="1.25rem"
                                            position="center"
                                            h_xs="150px"
                                            h_sm="200px"
                                            h_md="120px"
                                            h_lg="140px"
                                            h_xl="180px"
                                        /></Link> : null}
                                    <Row align="around" >

                                        <Column size size="12" customRespSize respSize="8" alignSelf="center" align="left">
                                            <Link to={`/post/${item.node.frontmatter.slug}`}><H4
                                                uppercase
                                                fs_xs="20px"
                                                fs_sm="24px"
                                                fs_md="16px"
                                                fs_lg="20px"
                                                fs_xl="22px"
                                            >{item.node.frontmatter.title}</H4></Link>
                                        </Column>
                                    </Row>
                                    <Row height="auto">
                                        <Column size="12" align="center">
                                            <Paragraph color="gray" align="left" margin="10px 0" fontSize="12px">{item.node.frontmatter.excerpt}</Paragraph>
                                        </Column>
                                    </Row>
                                    <Row height="auto" align="around">
                                        <Column size="1" customRespSize respSize="2" alignSelf="center">
                                            <RoundImage border="100%" width="30px" height="30px" bsize="contain" url={item.node.frontmatter.avatar} />
                                        </Column>
                                        <Column size="8" customRespSize respSize="8" alignSelf="center">
                                            <Paragraph color={Colors.gray} align="left"
                                                fs_xs="12px"
                                                fs_sm="12px"
                                                fs_md="10px"
                                                fs_lg="12px"
                                                fs_xl="12px" lineHeight="20px">{`${item.node.frontmatter.author} `}</Paragraph>
                                            <Paragraph color={Colors.gray} align="left" fs_xs="12px"
                                                fs_sm="12px"
                                                fs_md="10px"
                                                fs_lg="12px"
                                                fs_xl="12px" lineHeight="20px">{`${GetFormattedDate(item.node.frontmatter.date)}`}</Paragraph>
                                            {/* <Paragraph color={Colors.gray} align="left" fontSize="14px" lineHeight="20px">{`${post.fields.readingTime.text} read`}</Paragraph> */}
                                        </Column>
                                        <Column size="2" customRespSize respSize="2" align="end">
                                            <Link to={`/post/${item.node.frontmatter.slug}`}><ArrowRight width="24" color={Colors.yellow} fill={Colors.yellow} /></Link>
                                        </Column>
                                    </Row>

                                </Column>
                            )
                        })}
                    </div>
                </Row>
            </Wrapper>
            <Wrapper style="default">
                <Row align="left">
                    <Column size="12">
                        <H4

                            fs_xs="30px"
                            fs_sm="30px"
                            fs_md="30px"
                            fs_lg="30px"
                            fs_xl="30px"
                        >All Stories</H4>
                    </Column>
                </Row>
                <Row>
                    <Separator primary />
                </Row>
                <Divider height="50px" />
                <Row>
                    <div className="card-columns">
                        {data.posts.edges.filter(post => post.node.frontmatter.status === "published").map((item, i) => {
                            console.log("item", data)
                            return (
                                <Column size="12" masonry key={i} height="auto" margin="0 0 40px 0">
                                    {item.node.frontmatter.image != null ?
                                        <Link to={`/post/${item.node.frontmatter.slug}`}><RoundImage
                                            url={item.node.frontmatter.image}
                                            bsize="cover"
                                            mb="10px"
                                            border="1.25rem"
                                            position="center"
                                            h_xs="150px"
                                            h_sm="200px"
                                            h_md="120px"
                                            h_lg="140px"
                                            h_xl="180px"
                                        /></Link> : null}
                                    <Row align="around" >

                                        <Column size size="12" customRespSize respSize="8" alignSelf="center" align="left">
                                            <Link to={`/post/${item.node.frontmatter.slug}`}><H4
                                                uppercase
                                                fs_xs="20px"
                                                fs_sm="24px"
                                                fs_md="16px"
                                                fs_lg="20px"
                                                fs_xl="22px"
                                            >{item.node.frontmatter.title}</H4></Link>
                                        </Column>
                                    </Row>
                                    <Row height="auto">
                                        <Column size="12" align="center">
                                            <Paragraph color="gray" align="left" margin="10px 0" fontSize="12px">{item.node.frontmatter.excerpt}</Paragraph>
                                        </Column>
                                    </Row>
                                    <Row height="auto" align="around">
                                        <Column size="1" customRespSize respSize="2" alignSelf="center">
                                            <RoundImage border="100%" width="30px" height="30px" bsize="contain" url={item.node.frontmatter.avatar} />
                                        </Column>
                                        <Column size="8" customRespSize respSize="8" alignSelf="center">
                                            <Paragraph color={Colors.gray} align="left"
                                                fs_xs="12px"
                                                fs_sm="12px"
                                                fs_md="10px"
                                                fs_lg="12px"
                                                fs_xl="12px" lineHeight="20px">{`${item.node.frontmatter.author} `}</Paragraph>
                                            <Paragraph color={Colors.gray} align="left" fs_xs="12px"
                                                fs_sm="12px"
                                                fs_md="10px"
                                                fs_lg="12px"
                                                fs_xl="12px" lineHeight="20px">{`${GetFormattedDate(item.node.frontmatter.date)}`}</Paragraph>
                                            {/* <Paragraph color={Colors.gray} align="left" fontSize="14px" lineHeight="20px">{`${post.fields.readingTime.text} read`}</Paragraph> */}
                                        </Column>
                                        <Column size="2" customRespSize respSize="2" align="end">
                                            <Link to={`/post/${item.node.frontmatter.slug}`}><ArrowRight width="24" color={Colors.yellow} fill={Colors.yellow} /></Link>
                                        </Column>
                                    </Row>

                                </Column>
                            )
                        })}
                    </div>
                </Row>
            </Wrapper>
        </>
    )
}

export const postQuery = graphql`
query BlogQuery($file_name: String!, $lang: String!) {
    allPageYaml(filter: { fields: { file_name: { eq: $file_name }, lang: { eq: $lang }}}) {
      edges{
        node{
          
          meta_info{
            slug
            title
            description
            image
            keywords
          }
          banner{
            tagline
            sub_heading
            image 
          }
        
        }
      }
    }
    posts: allMarkdownRemark (filter: {frontmatter: {lang: {eq: $lang}}}){
        edges {
          node {
            frontmatter {
              author
              avatar
              date
              image
              slug
              title
              excerpt
              lang
              featured
              status
              
            }
          }
        }
      }
}


`
export default BaseRender(Blog);