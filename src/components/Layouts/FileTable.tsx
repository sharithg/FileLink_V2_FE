import React from "react";
import { connect } from "react-redux";
import { AddFile } from "../DriveFiles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { IFiles, IRootState } from "../../actions/types";

interface IFileTableProps {
  files: IFiles[];
}

interface IMapProps {
  current_class: string;
}

type Props = IFileTableProps & IMapProps;

const FileTable: React.FC<Props> = (props) => {
  const docs_icon_url =
    "https://drive-thirdparty.googleusercontent.com/16/type/application/vnd.google-apps.document";
  const sheets_icon_url =
    "https://drive-thirdparty.googleusercontent.com/16/type/application/vnd.google-apps.spreadsheet";
  const slides_icon_url =
    "https://drive-thirdparty.googleusercontent.com/16/type/application/vnd.google-apps.presentation";

  return (
    <div>
      <Grid
        container
        // alignItems="flex-start"
        justify="space-between"
        direction="row"
      >
        <Grid item>
          <Typography variant="h6" gutterBottom>
            Drive Files
          </Typography>
        </Grid>
      </Grid>
      <AddFile
        files={props.files}
        list_header="Docs"
        file_type="docs"
        current_class={props.current_class}
        file_icon_url={docs_icon_url}
      />
      <AddFile
        files={props.files}
        list_header="Sheets"
        file_type="sheets"
        current_class={props.current_class}
        file_icon_url={sheets_icon_url}
      />
      <AddFile
        files={props.files}
        list_header="Slides"
        file_type="slides"
        current_class={props.current_class}
        file_icon_url={slides_icon_url}
      />
    </div>
  );
};

const mapStateToProps = (state: IRootState) => ({
  // files: state.files.files,
  current_class: state.classes.current_class,
});

export default connect(mapStateToProps, null)(FileTable);
