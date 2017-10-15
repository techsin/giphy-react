const db = require("../db/config");

const Link = {};

Link.findAll = () => {
  return db.query("SELECT * FROM link");
};

Link.findById = id => {
  return db.oneOrNone(
    `
    SELECT * FROM link
    WHERE id = $1`,
    [id]
  );
};

Link.create = Link => {
  return db.one(
    `
        insert into link 
        (content, checked, position)
        values
        ($1, $2, $3) returning *
        `,
    [Link.content, "false", Link.position]
  );
};

Link.findLength = () => {
  return db.query("SELECT COUNT(id) FROM link");
};

Link.update = (Link, id) => {
  return db.none(
    `
        update link set
        content = $1,
        checked = $2
        where id = $3
        RETURNING *
        `,
    [Link.content, Link.checked, id]
  );
};

Link.updateOrder = Link => {
  console.log("hello");
  db.none(
    `
        update link set
        position = $1
        where id = $2
        `,
    [Link.index, Link.id]
  );
};

Link.destroy = id => {
  return db.none(
    `
        delete from link
        where id = $1
        `,
    [id]
  );
};

module.exports = Link;