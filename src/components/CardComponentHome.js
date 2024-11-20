import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Typography from '@mui/joy/Typography';


export default function CardComponentHome({cardHeading, cardText, cardIcon}) {
  return (
    <Card
      data-resizable
      sx={{
        textAlign: 'center',
        alignItems: 'center',
        width: 250,
        overflow: 'auto',
        resize: 'horizontal',
        '--icon-size': '100px',
      }}
    >
      <CardOverflow variant="solid" color="primary">
        <AspectRatio
          variant="outlined"
          color="primary"
          ratio="1"
          sx={{
            m: 'auto',
            transform: 'translateY(50%)',
            borderRadius: '50%',
            width: 'var(--icon-size)',
            boxShadow: 'sm',
            bgcolor: 'background.surface',
            position: 'relative',
          }}
        >
          <div>
           {cardIcon}
          </div>
        </AspectRatio>
      </CardOverflow>
      <Typography level="title-lg" sx={{ mt: 'calc(var(--icon-size) / 2)' }}>
        {cardHeading}
      </Typography>
      <CardContent sx={{ maxWidth: '40ch' }}>
       {cardText}
      </CardContent>
    </Card>
  );
}
