import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import { useMockArticles } from "../hooks";
import { ArticleWrapper } from "./article-wrapper";
import { ArticleMeasure } from "./article-measure";
import { ArticleToolbar } from "./article-toolbar";
import { RelatedArticles } from "./related-articles";

export function ArticleView(): JSX.Element {
  const theme = useTheme();
  const { title, author, image } = useMockArticles(1)[0];
  const relatedArticles = useMockArticles(3);
  return (
    <ArticleWrapper>
      <ArticleToolbar />
      <ArticleMeasure>
        <Typography component="h1" paragraph variant="h2">
          {title}
        </Typography>
        <Stack direction="row" gap={1}>
          <Avatar src={image} variant="circular" />
          <Typography variant="subtitle1">
            <em>by</em> <a href="#">{author}</a>
          </Typography>
        </Stack>
        <Typography component="h2" paragraph variant="h6">
          Coinbase has gotten the government’s attention.
        </Typography>

        <Divider sx={{ marginBottom: theme.spacing(2) }} />

        <Typography paragraph variant="body1">
          Cryptocurrency has an SEC problem — and it just got bigger.
        </Typography>
        <Typography paragraph variant="body1">
          The Biden administration is taking a more hands-on approach to the
          highly volatile, little understood, and barely regulated
          cryptocurrency industry. Cryptocurrencies are decentralized digital
          currencies secured by blockchain technology. Bitcoin, ethereum, and
          other cryptocurrencies have become almost as accessible as
          government-issued currency in recent years, but the government offers
          few consumer protections for them.
        </Typography>
        <Typography paragraph variant="body1">
          The Securities and Exchange Commission (SEC) — led by Gary Gensler,
          who taught a class on cryptocurrency at MIT — is trying to make the
          case that it can and will regulate whatever cryptocurrency investment
          schemes it decides fall under its purview. The relative newness and
          rapid expansion of the cryptocurrency industry have put it in a
          regulatory gray area. The Internal Revenue Service (IRS) classifies
          crypto as property. The Commodity Futures Trading Commission (CFTC)
          considers crypto to be a commodity. And the SEC has said that digital
          assets “may be securities, depending on the facts and circumstances.”
          A security is a financial asset that can be traded, like stocks and
          bonds, and which is governed by several laws designed to prevent fraud
          and protect investors.
        </Typography>
        <Typography paragraph variant="body1">
          The SEC appears to have decided that an upcoming offering from
          Coinbase, the largest cryptocurrency exchange in the United States,
          meets its definition of a security. And it’s showing that it will step
          in and regulate it accordingly — and, by extension, regulate the rest
          of the crypto finance industry more assertively.
        </Typography>
        <Typography paragraph variant="body1">
          Cryptocurrency exchanges allow people to buy and sell crypto. Coinbase
          is one of the biggest in the world and recently went public. It was
          planning to launch a program called Lend, which would allow investors
          to let others borrow from them a form of crypto called USDC, a
          “stablecoin” whose value is tied to the value of the US dollar (one
          USDC is always supposed to equal and be traded for the value of one US
          dollar). In exchange, lenders would receive 4 percent interest on the
          loan — a far higher rate than traditional banks currently offer on
          their savings accounts. This could have made the Coinbase Lend
          offering very attractive to consumers who wouldn’t have otherwise
          risked investing in crypto.
        </Typography>
        <Typography paragraph variant="body1">
          That’s where the SEC stepped in, according to Coinbase. The company
          announced on Wednesday (or late Tuesday, if you count a Twitter thread
          from CEO Brian Armstrong) that the SEC threatened to sue the company
          if it launched Lend, but that the agency wouldn’t tell Coinbase why it
          considered Lend to be a security, except that it was doing so “through
          the prism of decades-old Supreme Court cases.” These cases, informally
          known as Howey and Reves, are the prism through which every potential
          security is considered, including crypto services. Coinbase said it
          wanted formal guidance from the SEC on how it was using those cases to
          determine if Lend was a security, but the SEC wouldn’t provide it. The
          SEC has not officially commented yet, though some people think this
          tweet qualifies as a response.
        </Typography>
        <Typography paragraph variant="body1">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
          dolor purus non enim praesent elementum facilisis leo vel. Risus at
          ultrices mi tempus imperdiet. Semper risus in hendrerit gravida rutrum
          quisque non tellus. Convallis convallis tellus id interdum velit
          laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed
          adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies
          integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate
          eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo
          quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat
          vivamus at augue. At augue eget arcu dictum varius duis at consectetur
          lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa sapien
          faucibus et molestie ac.
        </Typography>
        <Typography paragraph variant="body1">
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
          ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar
          elementum integer enim neque volutpat ac tincidunt. Ornare suspendisse
          sed nisi lacus sed viverra tellus. Purus sit amet volutpat consequat
          mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis
          risus sed vulputate odio. Morbi tincidunt ornare massa eget egestas
          purus viverra accumsan in. In hendrerit gravida rutrum quisque non
          tellus orci ac. Pellentesque nec nam aliquam sem et tortor. Habitant
          morbi tristique senectus et. Adipiscing elit duis tristique
          sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
          eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
          posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography>
        <RelatedArticles articles={relatedArticles} />
      </ArticleMeasure>
    </ArticleWrapper>
  );
}
