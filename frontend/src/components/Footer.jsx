import React from "react";

const Footer = ({competedTaskCount = 0, activeTaskCount = 0}) => {
  return (
    <>
      {competedTaskCount + activeTaskCount > 0 && (
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            {competedTaskCount > 0 && (
              <>
                🎊 Tuyệt vời! Bạn đã hoàn thành {competedTaskCount} công việc
                {activeTaskCount > 0 && `, còn ${activeTaskCount} công việc nữa thôi. Chayoo🔥🔥🔥!`}
              </>
            )}
            {competedTaskCount === 0 && activeTaskCount > 0 && (
              <>🔥 Cố lên! Bạn còn {activeTaskCount} công việc cần hoàn thành.</>
            )}
          </p>
        </div>
      )}
    </>
  );
};  

export default Footer;