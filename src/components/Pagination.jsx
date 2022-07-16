import React, { useEffect } from "react";
import { Pagination, PaginationItem } from "@material-ui/lab";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../actions/posts";
import useStyles from "./styles";

const Paginate = ({ page }) => {
  const { totalPages } = useSelector((state) => state.posts);
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    if (page) dispatch(getPosts(page));
  }, [dispatch, page]);

  return (
    <Pagination
      classes={{ ul: classes.ul }}
      style={{ backgroundColor:'inherit'}}
      count={totalPages}
      page={Number(page) || 1}
      variant="outlined"
      renderItem={(item) => (
        <PaginationItem
          {...item}
          component={Link}
          to={`/posts?page=${item.page}`}
          style={{backgroundColor: '#20496b', color:"white", fontSize:'15px'}}
        />
      )}
    />
  );
};

export default Paginate;