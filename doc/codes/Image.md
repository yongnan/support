Image

const StyledGridBox = styled(Box, {
    display: 'grid',
    //width: '100%',
    background: 'rgba(0, 0, 0, .8)',              
    //padding: '0 4px',
    //gridTemplateColumns: '1fr 1fr 1fr 1fr', /* "1fr" for each column */
    gridTemplateColumns: 'repeat(1, 1fr)',
    //gridTemplateColumns:  'repeat(4, minmax(1, 8fr))',
    // gridTemplateRows: 'repeat(3, 200px)',
    // gridAutoFlow: 'column',
    // gridAutoColumns: '300px 100px',
    //gridColumnGap: '25px',
    //gridAutoRows: '100px',
    //gridAutoRows: 'minmax(100px, auto)',
    gridAutoRows: '100px, 200px',
    //alignItems: 'center',
    //ai: 'center',
    //mb: 2,
    gap: '10px',
    '@bp2': { gridTemplateColumns: 'repeat(1, 1fr)' },
    '@bp3': { gridTemplateColumns: 'repeat(4, 1fr)' },
    '@bp4': { gridTemplateColumns: 'repeat(6, 1fr)' },
  })
  const StyledFigure = styled('figure', {
    // gridColumnStart: '1',
    // gridColumnEnd: '3',
    // gridRowStart: '1',
    // gridRowEnd: '3',
  })  
  const StyledImg = styled('img', {
    display: 'block',
    verticalAlign: 'middle',
    width: 'auto', //'150px', //'20vw',   //default
    //height: '150px', //'20vw',  //default
    // width: '70vw',
    // height: 'auto',
    maxWidth: '100%',
    //maxHeight: '100%',
    objectFit: 'cover',
    //'@bp2': { width: '100px' },
    //'@bp3': { width: '100px' },
    //'@bp4': { width: 'auto' },
  })

return (
    <>
      {/* All photos, row display */}
      {!lightBoxDisplay &&
          <StyledGridBox flow='row' columns='4'>
            {images.map((image, i) => (
              <Box key={i}>
                <StyledImg
                  src={`${image.preview}?not-from-cache-please`} 
                  onClick={(e: any) => showImage(e, image, i)} 
                  className={`${currentIndex === i ? "selected" : ""}`}
                />
              </Box>  
            ))}
          </StyledGridBox>  
      }
      