searchList.length === 0 ? searchList.map((item, index) => (
    <div key={index} style={{
      width: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      borderBottom: "2px solid lightgrey"
    }}>
      <div>
        <h4 className={styles.listTitle} >
          {item.fileName}
        </h4>
      </div>
      <div style={{
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
        gap: "10px",
      }}>
        <Link href={`/pdffile/${item.fileName}`} target="_blank">
          <Button style={{
            margin: "5px",
          }} size="small" variant="contained" id="#contained-buttons">
            Open
          </Button>
        </Link>
        <button style={{
          cursor: "pointer",
          color: "white",
          backgroundColor: "red",
          border: "none",
          borderRadius: "3px",
          padding: "2px",
          boxShadow: "2px 2px 2px grey"
        }}
          onClick={() => handleDelete(item.fileName)}
        ><DeleteIcon />
        </button>


      </div>
    </div>
  )) :
    listIsEmpty ? <h2>PDF List Is Empty</h2> : <PdfListSkeleton />