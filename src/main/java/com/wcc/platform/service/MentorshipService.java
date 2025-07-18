package com.wcc.platform.service;

import static com.wcc.platform.domain.cms.PageType.AD_HOC_TIMELINE;
import static com.wcc.platform.domain.cms.PageType.MENTORS;
import static com.wcc.platform.domain.cms.PageType.MENTORSHIP;
import static com.wcc.platform.domain.cms.PageType.MENTORSHIP_CONDUCT;
import static com.wcc.platform.domain.cms.PageType.MENTORSHIP_FAQ;
import static com.wcc.platform.domain.cms.PageType.STUDY_GROUPS;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.wcc.platform.domain.cms.pages.mentorship.MentorsPage;
import com.wcc.platform.domain.cms.pages.mentorship.MentorshipAdHocTimelinePage;
import com.wcc.platform.domain.cms.pages.mentorship.MentorshipCodeOfConductPage;
import com.wcc.platform.domain.cms.pages.mentorship.MentorshipFaqPage;
import com.wcc.platform.domain.cms.pages.mentorship.MentorshipPage;
import com.wcc.platform.domain.cms.pages.mentorship.MentorshipStudyGroupsPage;
import com.wcc.platform.domain.exceptions.PlatformInternalException;
import com.wcc.platform.repository.PageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/** Mentorship service. */
@SuppressWarnings("PMD.TooManyStaticImports")
@Service
public class MentorshipService {
  private final ObjectMapper objectMapper;
  private final PageRepository repository;

  @Autowired
  public MentorshipService(final ObjectMapper objectMapper, final PageRepository repository) {
    this.objectMapper = objectMapper;
    this.repository = repository;
  }

  /**
   * API to retrieve information about mentorship overview.
   *
   * @return Mentorship overview page.
   */
  public MentorshipPage getOverview() {
    final var page = repository.findById(MENTORSHIP.getId());
    if (page.isPresent()) {
      try {
        return objectMapper.convertValue(page.get(), MentorshipPage.class);
      } catch (IllegalArgumentException e) {
        throw new PlatformInternalException(e.getMessage(), e);
      }
    }
    return repository.getFallback(MENTORSHIP, MentorshipPage.class, objectMapper);
  }

  /**
   * API to retrieve information about mentorship faq.
   *
   * @return Mentorship faq page.
   */
  public MentorshipFaqPage getFaq() {
    final var page = repository.findById(MENTORSHIP_FAQ.getId());
    if (page.isPresent()) {
      try {
        return objectMapper.convertValue(page.get(), MentorshipFaqPage.class);
      } catch (IllegalArgumentException e) {
        throw new PlatformInternalException(e.getMessage(), e);
      }
    }
    return repository.getFallback(MENTORSHIP_FAQ, MentorshipFaqPage.class, objectMapper);
  }

  /**
   * API to retrieve information about mentorship code of conduct.
   *
   * @return Mentorship code of conduct page.
   */
  public MentorshipCodeOfConductPage getCodeOfConduct() {
    final var page = repository.findById(MENTORSHIP_CONDUCT.getId());
    if (page.isPresent()) {
      try {
        return objectMapper.convertValue(page.get(), MentorshipCodeOfConductPage.class);
      } catch (IllegalArgumentException e) {
        throw new PlatformInternalException(e.getMessage(), e);
      }
    }
    return repository.getFallback(
        MENTORSHIP_CONDUCT, MentorshipCodeOfConductPage.class, objectMapper);
  }

  /**
   * API to retrieve information about the study groups.
   *
   * @return Mentorship study groups page.
   */
  public MentorshipStudyGroupsPage getStudyGroups() {
    final var page = repository.findById(STUDY_GROUPS.getId());
    if (page.isPresent()) {
      try {
        return objectMapper.convertValue(page.get(), MentorshipStudyGroupsPage.class);
      } catch (IllegalArgumentException e) {
        throw new PlatformInternalException(e.getMessage(), e);
      }
    }
    return repository.getFallback(STUDY_GROUPS, MentorshipStudyGroupsPage.class, objectMapper);
  }

  /**
   * API to retrieve information about mentors.
   *
   * @return Mentors page containing details about mentors.
   */
  public MentorsPage getMentors() {
    final var page = repository.findById(MENTORS.getId());
    if (page.isPresent()) {
      try {
        return objectMapper.convertValue(page.get(), MentorsPage.class);
      } catch (IllegalArgumentException e) {
        throw new PlatformInternalException(e.getMessage(), e);
      }
    }
    return repository.getFallback(MENTORS, MentorsPage.class, objectMapper);
  }

  /**
   * API to retrieve information about ad hoc timeline.
   *
   * @return Mentorship ad hoc timeline page.
   */
  public MentorshipAdHocTimelinePage getAdHocTimeline() {
    final var page = repository.findById(AD_HOC_TIMELINE.getId());
    if (page.isPresent()) {
      try {
        return objectMapper.convertValue(page.get(), MentorshipAdHocTimelinePage.class);
      } catch (IllegalArgumentException e) {
        throw new PlatformInternalException(e.getMessage(), e);
      }
    }
    return repository.getFallback(AD_HOC_TIMELINE, MentorshipAdHocTimelinePage.class, objectMapper);
  }
}
