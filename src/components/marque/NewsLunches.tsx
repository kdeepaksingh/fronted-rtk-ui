import React, { useEffect, useMemo } from "react";
import moment from "moment";
import Marquee from "react-fast-marquee";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import { CustomTooltip } from "../tooltip/CustomToolTip";
import Text from "../typography/Text";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  fetchNewsEvents,
  fetchNewsToken,
  selectNewsEvents,
  selectNewsToken,
} from "../../features/news/newsSlice";

const Launches: React.FC = () => {
  const dispatch = useDispatch();
  const token = useSelector(selectNewsToken);
  const newsData = useSelector(selectNewsEvents);

  const dates = useMemo(
    () => ({
      from: moment().subtract(7, "days").format("YYYY-MM-DDTHH:mm"),
      to: moment().format("YYYY-MM-DDTHH:mm"),
    }),
    []
  );

  useEffect(() => {
    dispatch(fetchNewsToken());
  }, [dispatch]);

  useEffect(() => {
    if (token) {
      dispatch(
        fetchNewsEvents({ from_date: dates.from, to_date: dates.to, token })
      );
    }
  }, [token, dispatch, dates]);

  return (
    <div className="hover:cursor-pointer bg-marquee-bg h-10 flex">
      {/* Left label section */}
      <div className="w-[12.5%] md:w-[15%] h-10 flex items-center justify-center bg-marquee-date-bg italic">
        <Text text="NEWS" size={14} className="font-bold !text-xs" />
      </div>

      {/* Marquee content */}
      <div className="flex-1 w-full">
        <Marquee speed={50} pauseOnHover play loop={0}>
          {newsData?.map((item) => {
            const formattedDate = moment(item.date).format("MMMM DD, YYYY");

            return (
              <Card
                className="mx-1 py-1 !bg-marquee-bg !shadow-inner border !border-transparent max-w-[300px] my-0.5"
                key={item.id}
              >
                <CustomTooltip
                  maxWidth={400}
                  title={
                    <div>
                      <h2 className="text-sm">{item.news_headline}</h2>
                      <div className="capitalize text-xxs opacity-80 mt-1">
                        <Stack
                          direction="row"
                          divider={
                            <Divider
                              orientation="vertical"
                              flexItem
                              className="border-inherit bg-white"
                            />
                          }
                          spacing={1}
                          alignItems="center"
                        >
                          {[
                            [item.state, item.district]
                              .filter(Boolean)
                              .join(" "),
                            item.category,
                            item.crop,
                          ]
                            .filter(Boolean)
                            .map((v, i) => (
                              <div key={i}>{v}</div>
                            ))}
                        </Stack>
                      </div>
                      <Divider
                        orientation="horizontal"
                        className="bg-white !my-4"
                      />
                      <div>{item.short_description}..</div>
                      <div
                        className="font-bold my-3 capitalize cursor-pointer hover:underline"
                        onClick={() => window.open(item.link)}
                      >
                        Click To Read More
                      </div>
                    </div>
                  }
                >
                  <div
                    className="px-3 marquee-item leading-tight text-upag-primary"
                    onClick={() => window.open(item.link)}
                  >
                    <Text
                      text={item.news_headline}
                      size={12}
                      className="font-semibold truncate !capitalize"
                    />
                    <Text
                      text={formattedDate}
                      size={10}
                      className="text-upag-primary"
                    />
                  </div>
                </CustomTooltip>
              </Card>
            );
          })}
        </Marquee>
      </div>
    </div>
  );
};

export default Launches;
