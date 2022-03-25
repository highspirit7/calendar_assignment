import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { Modal, Input, message } from "antd";

import { initCalendar, addSchedule } from "store/actions/calendar";
import {
  showModalToAddSchedule,
  closeModalToAddSchedule,
} from "store/actions/modal";
import WeekOfCalendar from "./WeekOfCalendar";
import {
  DAYS,
  SCHEDULE_MODAL_INPUT_PLACEHOLDER,
  SCHEDULE_MODAL_GUIDE_INFO,
  MSG_AFTER_ADD_SCHEDULE,
} from "constants";

const CalendarBody = () => {
  const dispatch = useDispatch();
  const calendarState = useSelector((state) => state.calendar);
  const modalState = useSelector((state) => state.modal);

  const { selectedMonth, selectedYYYYMM, isTodayBtnClicked } = calendarState;
  const { isAddScheduleModalVisible, date: dateForModal } = modalState;

  const [scheduleNameForModal, setScheduleName] = useState("");

  const onChangeScheduleName = (e) => {
    const { value } = e.target;

    setScheduleName(value);
  };

  const handleOkForModal = () => {
    setScheduleName("");

    dispatch(addSchedule({ name: scheduleNameForModal, date: dateForModal }));

    message.success(MSG_AFTER_ADD_SCHEDULE);

    dispatch(closeModalToAddSchedule());
  };

  const handleCancelForModal = () => {
    dispatch(closeModalToAddSchedule());
  };

  function changeDateFormatInKorean() {
    const [yyyy, mm, dd] = dateForModal.split("-");

    return `${yyyy}년 ${mm}월 ${dd}일`;
  }

  return (
    <>
      <StyledTable>
        <THead>
          <TR>
            {DAYS.map((day) => (
              <TH key={day}>{day}</TH>
            ))}
          </TR>
        </THead>
        <TBody>
          {Array.from({ length: 7 }, (v, i) => i).map((i) => {
            return (
              <WeekOfCalendar
                startToSlice={i * 7}
                endToSlice={i * 7 + 7}
                key={`${i + 1}_week`}
              />
            );
          })}
        </TBody>
      </StyledTable>
      <Modal
        title={changeDateFormatInKorean() + " 스케줄 추가"}
        visible={isAddScheduleModalVisible}
        okText="저장"
        cancelText="취소"
        onOk={() => handleOkForModal()}
        onCancel={() => handleCancelForModal()}
      >
        <Input
          onChange={onChangeScheduleName}
          value={scheduleNameForModal}
          placeholder={SCHEDULE_MODAL_INPUT_PLACEHOLDER}
          maxLength={18}
        />
        <GuideInfo>{SCHEDULE_MODAL_GUIDE_INFO}</GuideInfo>
      </Modal>
    </>
  );
};

export default CalendarBody;

export const StyledTable = styled.table`
  color: ${({ theme }) => theme.colors.primary};
`;

export const THead = styled.thead`
  // custom css goes here
`;

export const TBody = styled.tbody`
  // custom css goes here
`;

export const TR = styled.tr`
  // custom css goes here
`;

export const TH = styled.th`
  width: 100px;
  text-align: right;
  font-weight: 600;
  color: ${(props) => {
    if (props.children === "일" || props.children === "토") {
      return props.theme.colors.secondary;
    }
  }};
`;

const GuideInfo = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.today};
`;
