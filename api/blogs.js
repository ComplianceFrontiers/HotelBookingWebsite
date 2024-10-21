// images
import blogImg1 from "/public/images/blog/1.jpg";
import blogImg2 from "/public/images/blog/2.jpg";
import blogImg3 from "/public/images/blog/3.jpg";

import blogSingleImg1 from "/public/images/blog/img-4.jpg";
import blogSingleImg2 from "/public/images/blog/img-5.jpg";
import blogSingleImg3 from "/public/images/blog/img-6.jpg";



const blogs = [
    {
        id: '1',
        title: 'Things You Must Need To See While You’re In Dubai',
        slug:'You’re-In-Dubai',
        screens: blogImg1,
        Thumb:'Travelling',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse sint magni harum nihil voluptates, recusandae.',
        author: 'Loura Sweety',
        create_at: '25 Sep 2023',
        blogSingleImg:blogSingleImg1, 
        comment:'35',
        blClass:'format-standard-image',
    },
    {
        id: '2',
        title: 'Be Careful About This, When You Are In Snow',
        slug:'Be-areful-About-This-When-You-Are-In-Snow',
        screens: blogImg2,
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse sint magni harum nihil voluptates, recusandae.',
        author: 'David Luis',
        Thumb:'Travelling',
        create_at: '23 Sep 2023',
        blogSingleImg:blogSingleImg2, 
        comment:'80',
        blClass:'format-standard-image',
    },
    {
        id: '3',
        title: '17 places you cannot ignore in Paris',
        slug:'17-places-you-cannot-ignore-in-Paris',
        screens: blogImg3,
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse sint magni harum nihil voluptates, recusandae.',
        author: 'Jenefer Willy',
        create_at: '21 Sep 2023',
        Thumb:'Travelling',
        blogSingleImg:blogSingleImg3,
        comment:'95',
        blClass:'format-video',
    },
];

export default blogs;