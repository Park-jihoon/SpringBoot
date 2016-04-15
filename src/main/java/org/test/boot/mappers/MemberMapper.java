package org.test.boot.mappers;

import org.apache.ibatis.annotations.Param;
import org.test.boot.domain.Member;

/**
 * Created by Administrator on 2015-05-17.
 */
public interface MemberMapper {
    Member getByID(@Param("userId") String userId, @Param("password") String password);
}
