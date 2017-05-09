module.exports = {
    getCount: 'select (select count(*)  from "Moments" where "userId" = :id) as "momentCount",' +
    '(select Sum(count1."count"+count2."count")  from' +
    '(select count(*)  from "JoinActivities" where "userId" = :id) as count1,' +
    '(select count(*)  from "Activities" where "userId" = :id) as count2) as "activityCount",' +
    '(select count(*)  from public."Relations" where "userId" = :id and "status" = 1) as "friendCount",' +
    '(select count(*)  from public."Appraises" where "userId" = :id and "isDislike" = true) as "dislikeCount",' +
    '(select count(*)  from public."Appraises" where "userId" = :id and "isDislike" = false) as "appraiseCount",' +
    '(select count(*)  from public."Appraises" where "userId" = :id and "isLate" = true) as "lateCount"'
}